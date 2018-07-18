var logic = {
    _callApi: function(path, callback) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var res = JSON.parse(request.responseText);
    
                    callback(undefined, res);
                } else callback(Error('request error, status ' + request.status));
            }
        };

        var url = 'https://quiet-inlet-67115.herokuapp.com/api' + path;

        request.open('get', url);

        request.send();
    },

    searchBeers: function(query, callback) {
        this._callApi('/search/all?q=' + query, callback);
    },

    retrieveBeerById: function(id, callback) {
        this._callApi('/beer/' + id, callback);
    }
};