var logic = {
    token: 'NO-TOKEN',

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

            var url = 'https://api.spotify.com/v1' + path;

            request.open('get', url);

            request.setRequestHeader('Authorization', 'Bearer ' + 'BQBAX5rhQKLz4Ha_J9nVnBdx1dDFk28d0JoTHpALXxkCvCzBBV7ctVUOgkX7lX4-HZiDh70bYIyqMLRz5gpq4G-UIgutv5QkP6zayTnSRJm30xpTsPGebP98se6-sqoKzu4-IO2qrCA');


            request.send();
        }.bind(this));

    },

    searchArtists: function (query) {
        return this._callApi('/search?type=artist&query=' + query)
            .then(function(res) {
                return res.artists.items;
            });
    },

    retrieveAlbumsByArtistId(id) {
        return this._callApi('/artists/' + id + '/albums')
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTracksByAlbumId(id) {
        // TODO
        return this._callApi('/albums/' + id + '/tracks')
            .then(function(res){
                return res.items;
            });
    },

    retrieveTrackById(id) {
        // TODO
        return this._callApi('/tracks/' + id)
            .then(function(res){
                return res;
            });
    }
};