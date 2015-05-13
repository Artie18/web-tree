var WebTree = function(type, opts) {
  if(typeof opts === "undefined") { opts = {} };

  switch(type.toLowerCase()) {
    case "native":
      return new WebTreeNative(opts);
    case "react":
      throw "TODO: Implement";
      break;
    default:
      throw "Please Choose Type of Library (Native or React)"
      break;
  }
}

var WebTreeNative = function (opts) {
  // Define self to use inside of functions
  var self = this;
  
  // If we need to build data from DOM
  // Always false for now
  self.buildDataFromDom = false; //opts.fromDom || false;
  // If We are building from DOM, we need Node from wich to choose
  self.nodeWhereDomDataIs = opts.dataDomElement;
  // If we need to listen for events to drag and drop our site map elements
  self.listen = opts.listen || true;

  this.isAChild = function (child, parent) {
    var node = child.parentNode;
    while(node != null) {
      if(node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  this.fetchDomData = function () {
    throw "TODO: Implement";
    // TODO: Implement
  };

  this.onDragStart = function (e) {
    e.dataTransfer.setData('id', e.toElement.id);
  }

  this.onDragOver = function (e) {
    e.preventDefault();
  }

  this.onInputKeyPress = function (e) {
    if(e.keyCode != 13) {
      return;
    }

    var _span = document.createElement('span'),
        _input = e.currentTarget;

    _span.textContent = _input.value;
    _input.parentElement.setAttribute('data-name', _input.value);
    _input.parentElement.replaceChild(_span, _input);
  }

  this.onSpanDblClick = function (e) {
    var _input = document.createElement('input'),
        _elem  = e.currentTarget;

    _input.value = _elem.textContent;
    _input.onkeypress = self.onInputKeyPress;
    _elem.parentElement.replaceChild(_input, _elem);
  }

  this.onDrop = function (e) {
    e.preventDefault();
    var el = e.toElement;
    var elToDrop = document.getElementById(e.dataTransfer.getData('id'));
    if(self.isAChild(el, elToDrop)) {
      return;
    }

    if(el.className == "parent") {
      el.firstElementChild.appendChild(elToDrop);
    } else {
      var _ul = document.createElement('ul');
      _ul.appendChild(elToDrop);
      el.appendChild(_ul);
    }
  }

  // This function is renders basic DOM;
  // TODO: Make it simple
  this.render = function (node, data) {
    if(typeof data === 'undefined') { data = self.data }

    // Clean vars to clone node from
    var ul   = document.createElement('ul');
    var li   = document.createElement('li');
    var span = document.createElement('span');

    // Recursive function to build tree
    var buildTreePart = function (node, data) {
      var _ul = ul.cloneNode(true);
      for(var i = 0; i < data.length; i++) {

        // Create needed nodes
        var _li   = li.cloneNode(true),
            _span = span.cloneNode(true);

        // Add callbacks to Li element
        _li.ondragstart   = self.onDragStart;
        _li.ondragover    = self.onDragOver;
        _li.ondrop        = self.onDrop;

        // Add attributes to Li element
        _span.textContent = data[i].name;
        _span.value       = data[i].name;
        _span.ondblclick    = self.onSpanDblClick;
        _li.draggable     = true;
        _li.id            = data[i].id || data[i]['_id'];
        _li.appendChild(_span);
        _li.setAttribute('data-name', data[i].name);
        _li.setAttribute('data-id', (data[i].id || data[i]['_id']));

        // Check if we node has child pages
        if(Array.isArray(data[i].children)) {
            _li.className = "parent";
          _li = buildTreePart(_li, data[i].children);
        }

        _ul.appendChild(_li);
      }
      node.appendChild(_ul);

      return node;
    }

    // Build main project folder in view
    var _ul   = ul.cloneNode(true),
        _li   = li.cloneNode(true);
        _span = span.cloneNode(true);

    // Initialize Main Node

    // Set callbacks on main node
    _li.ondragover = self.onDragOver;
    _li.ondrop = self.onDrop;
    // Add atributes to a main node
    _span.textContent = data.name;
    _li.appendChild(_span);
    _li.setAttribute('data-name', data.name);
    _li.setAttribute('data-id', (data.id || data['_id']));
    node.appendChild(_ul.appendChild(_li));

    // Start recursive sitemap rendering
    buildTreePart(_li, data.pages);
  };

  if(self.buildDataFromDom) {
    self.fetchDomData();
  }

}
