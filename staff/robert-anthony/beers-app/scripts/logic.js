var logic = {


    _callAPI: function (path, callback) {


      const base = "https://quiet-inlet-67115.herokuapp.com/api";

      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          var data = JSON.parse(request.responseText);
          callback(data);
        }
      };
      request.open('get', base + path);
      request.send();
    },

    searchBeers: function (query, callback) {
      var url = "/search/all?q=" + query;
      this._callAPI(url, callback);
    },

    retrieveBeerById: function (id, callback) {
      this._callAPI("/beer/" + id, callback);

    }
  }
;