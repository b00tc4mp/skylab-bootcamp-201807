var logic = {
    token: 'NO-TOKEN',

    _callApi: function (path) {
        var url = 'https://api.spotify.com/v1' + path;
        return $.ajax({
            url: url,
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then(function (res) {
            return res;
        });
    },

    searchArtists: function (query) {
        return this._callApi('/search?type=artist&query=' + query)
            .then(function (res) {
                return res.artists.items;
            });
    },

    retrieveAlbumsByArtistId(id) {
        return this._callApi('/artists/' + id + '/albums')
            .then(function (res) {
                return res.items;
            });
    },

    retrieveTracksByAlbumId(id) {
        return this._callApi('/albums/' + id + '/tracks')
            .then(function (res) {
                return res.items;
            });
    },
    retrieveTrackById(id) {
        // TODO
    }
};