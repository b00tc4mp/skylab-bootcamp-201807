var logic = {
    token: 'BQBs8wfXZWV-8kPbZc3OTbDX2aNq1lGorph7CAYAx4VgTZEaFwLC9I2xzklvBNYqlP5reVjaROM30SQuafTl1AztyMzTRrkFjviS3F3gXTjEdZsC-D7hk5siYV_MSrgxPXuzJA07Roq2OsGLhB4YVDv477EJUxkn1q4',

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