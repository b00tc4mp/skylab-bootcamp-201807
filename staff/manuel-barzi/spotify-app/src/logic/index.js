var logic = {
    token: 'NO-TOKEN',

    _callApi: function (path) {
        return fetch('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.token
            }
        })
            .then(function (res) { return res.json() })
            .then(function (res) {
                if (res.error) throw Error('request error, status ' + res.error.status);

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
        return this._callApi('/tracks/' + id)
            .then(function (res) {
                return res;
            });
    }
};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;