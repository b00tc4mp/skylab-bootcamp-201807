var logic = {
    _callApi: function (path) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var res = JSON.parse(request.responseText);

                        resolve(res);
                    } else reject(Error('request error, status ' + request.status));
                }
            };

            var url = 'https://quiet-inlet-67115.herokuapp.com/api' + path;

            request.open('get', url);

            request.send();
        });

    },

    searchBeers: function (query) {
        return this._callApi('/search/all?q=' + query);
    },

    retrieveBeerById: function (id) {
        return this._callApi('/beer/' + id);
    }
};