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
  // URL to fetch data from
  this.fetchBackendUrl = opts.postUrl || opts.url;
  // URL to post data to
  this.postBackendUrl  = opts.fetchUrl || opts.url;
  // If we need to build data from DOM
  // Always false for now
  this.buildDataFromDom = false; //opts.fromDom || false;
  // If We are building from DOM, we need Node from wich to choose
  this.nodeWhereDomDataIs = opts.dataDomElement;
  if(this.buildDataFromDom) {
    this.fetchDomData();
  }

  this.fetchDomData = function () {
    throw "TODO: Implement";
    // TODO: Implement
  };

  this.render = function (node, data) {
    // Clean vars to clone node from
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    var mainUl = ul.cloneNode(true);

    var buildTreePart = function (node, data) {
      var _ul = ul.cloneNode(true);
      for(var i = 0; i < data.length; i++) {
        var _li = li.cloneNode(true);
        _li.textContent = data[i].name;
        if(Array.isArray(data[i].children)) {
          _li = buildTreePart(_li, data[i].children);
        }
        _ul.appendChild(_li);
      }
      node.appendChild(_ul);
      return node;
    }

    buildTreePart(node, data);
  };
}