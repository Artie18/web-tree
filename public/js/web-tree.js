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
  self = this;
  // URL to fetch data from
  self.fetchBackendUrl = opts.fetchUrl || opts.url;
  // URL to post data to
  self.postBackendUrl  = opts.postUrl || opts.url;
  // If we need to build data from DOM
  // Always false for now
  self.buildDataFromDom = false; //opts.fromDom || false;
  // If We are building from DOM, we need Node from wich to choose
  self.nodeWhereDomDataIs = opts.dataDomElement;
  // If we need to listen for events to drag and drop our site map elements
  self.listen = opts.listen || true;

  // TODO: Remove this method from here! We don't need it in the library
  self.fetchDataFromServer = function () {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', self.fetchBackendUrl, false);
    xhr.send();

    if (xhr.status != 200) {
      throw xhr.status + ': ' + xhr.statusText;
    } else {
      self.data = JSON.parse(xhr.responseText);
    }
  }

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
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    // Recursive function to build tree
    var buildTreePart = function (node, data) {
      var _ul = ul.cloneNode(true);
      for(var i = 0; i < data.length; i++) {
        var _li = li.cloneNode(true);
        _li.draggable = true;
        _li.id = data[i].id || data[i]['_id'];
        _li.ondragstart = self.onDragStart;
        _li.ondragover = self.onDragOver;
        _li.ondrop = self.onDrop;
        _li.textContent = data[i].name;
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
    var _ul = ul.cloneNode(true),
        _li = li.cloneNode(true);
    _li.ondragover = self.onDragOver;
    _li.ondrop = self.onDrop;
    _li.textContent = data.name;
    node.appendChild(_ul.appendChild(_li));
    // Start recursive rendering
    buildTreePart(_li, data.pages);
  };

  if(self.buildDataFromDom) {
    self.fetchDomData();
  }

  if(self.fetchBackendUrl) {
    self.fetchDataFromServer();
  }



}
