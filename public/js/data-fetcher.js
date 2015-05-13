var DataFetcher = function(opts) {
  // Make sure we have it inside functions
  var self = this;

  self.getUrl  = opts.getUrl || '';
  self.postUrl = opts.postUrl || '';

  /**
   * Posting json sitemap data to a server
   *
   * @param {json} _data
   * @param {string} _url
   * @returns {bool} isSaved
   */
  self.post = function (_data, _url) {
    var url = _url || self.postUrl;
    if(!url) {
      throw 'No url specified!';
    }

    var xhr = new XMLHttpRequest();

    // No callback for now
    xhr.open('POST', url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(_data));

    if (xhr.status != 200) {
      throw xhr.status + ': ' + xhr.statusText;
    } else {
      return JSON.parse(xhr.responseText);
    }

  }

  /**
   * Getting sitemap json data from a server
   *
   * @param {string} _url
   * @returns {json} data
   */
  self.get = function (_url) {
    var url = _url || self.postUrl;
    if(!url) {
      throw 'No url specified!'
    }

    var xhr = new XMLHttpRequest();

    // No callback for now
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status != 200) {
      throw xhr.status + ': ' + xhr.statusText;
    } else {
      return JSON.parse(xhr.responseText);
    }

  }
}
