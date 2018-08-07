"use strict";

var logic = {
    searchBeers: function(query, callback) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var beers = JSON.parse(request.responseText);

                callback(beers);
            }
        };

        var url = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query;

        request.open('get', url);

        request.send();
    },

    retrieveBeerById: function(id, callback) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var beer = JSON.parse(request.responseText);

                callback(beer);
            }
        };

        var url = 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + id;

        request.open('get', url);

        request.send();
    }
};