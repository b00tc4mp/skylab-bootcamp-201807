var logic = {
    /*searchBeers: function(query, callback) {
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
    
*/

    searchBeers: function(url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', url);
        
            req.onload = function() {
                if (req.readyState === 4 && req.status === 200) {
                    var beers = JSON.parse(req.responseText);
                    resolve(beers);
                   // resolve(req.response);// Resolve the promise with the response text
                }
                else {
                    reject(Error(req.statusText));// Otherwise reject with the status text
                }
            };
        
            req.onerror = function() {
                reject(Error("Network Error"));
            };
        
            req.send(); // Make the request
        });
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