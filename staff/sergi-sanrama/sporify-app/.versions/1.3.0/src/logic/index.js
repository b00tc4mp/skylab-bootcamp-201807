var logic = {
   // token: 'BQD83u9rvdmsQ_uYfNAT7AmHQfy1Ykg5Jv1iBnJpYQttTZWUW8O2DH2T4fT70t8mDpCo55oNzjCKzmXaEKlKkZ3LClLk4tSxw998d29Q9_gtN8abOCJK_8A37aXo9CW626YQINNTr1v5JtAJJRgE5Xd',

    _callApi: function (path) {
        return fetch('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.token
            }
        })
        .then(function(res ) { return res.json() })
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

// export default logic
if (typeof module !== 'undefined') module.exports = logic