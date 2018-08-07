var logic = {
    token: 'NO-TOKEN',

    _callApi: function (path) {
        const url = 'https://api.spotify.com/v1' + path;
        return fetch(url,{
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then(res => res.json())
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
        return this._callApi('/tracks/' + id)
        .then(function(res) {
            return res;
        });
    }
};

if(typeof module !== 'undefined')
    module.exports = logic