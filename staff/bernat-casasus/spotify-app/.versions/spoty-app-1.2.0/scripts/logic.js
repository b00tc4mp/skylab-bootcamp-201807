var logic = {
    token: 'BQB2BZeDZeQEr66P2q8nNMuepiNGj7GKLs-erV_aLBRVf_Axo1DCBxZy4CCu2E00Mh2uUehf010KP2vdf7T3DsBrMA6eYTPthaZFJIUQNeF5k5VI3DugDQB9hPRH52xEbckF0r-VbHatEAQa5XkHf7CN3KHcRfAfco0',

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