var logic = {
    token: 'BQDmGeClsbjEHcUAXJQGjD6i2lMC7uxNINF_-c6H_e5E18F7ISXP799iPhuG-CNGEvuVeKHfaiMJ99F5XPM4rPEa4AgSE2a-favP9nE7SXtiqB-iKfhp33Perb3kgbGU5IiAcGo7DuquikUPUElWSJHjf7bZGPzqSY4',

    _callApi: function (path) {
        return $.ajax('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.token
            }
        })
        .catch(function(err) {
            throw Error('request error, status ' + err.status);
        });
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
        return this._callApi('/albums/' + id + '/tracks')
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTrackById(id) {
        return this._callApi('/tracks/' + id)
            .then(function(res) {
                return res;
            });
    }
};