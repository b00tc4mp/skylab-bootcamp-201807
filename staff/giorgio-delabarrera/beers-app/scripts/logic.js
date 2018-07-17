'use strict';

var API_DOMAIN = 'https://quiet-inlet-67115.herokuapp.com/api';

var logic = {
    
    _requestAsync: function(method, url, callback) {
        
        var request = new XMLHttpRequest();
        
        request.open(method, url);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var result = JSON.parse(request.responseText);
                callback(result);
            }
        };
        request.send();
    },

    searchBeers: function(query, callback) {
        
        var url = API_DOMAIN + '/search/all?q=' + query;
        this._requestAsync('GET', url, callback);
    },

    retrieveBeerById: function(id, callback) {

        var url = API_DOMAIN + '/beer' + id;
        this._requestAsync('GET', url, callback);
    }
};