var logic = {
    token: 'BQCm8Rm2-ixSb6YFH6Mv31HSgyGfHkTuppWfYaq5bN23qnxTKQHMXOoLPIE8xJsAtUIRLKduzspUkspI8l54Z8X_t4nlUqqLkBbLiW8aPEcctVhUgEY4MXezM6MhsTx6giKLHEEtlTfGRK23otpFGkNbq_GDppAKisw',

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