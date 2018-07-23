var logic = {
    token: 'BQBJTnUCLyeVUnPs7pGXY7HqxXO_ibfeyw992oV5qqnULHRUv8J5-UFlWleTYQ547ZbV4snSGkiiOHMsYL3Xq7HYnKqqJ-z1E0Qx-_5dxfIFOrG1T-qhrhAjTVO92Te5lGGnsR2G19BpFg',

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