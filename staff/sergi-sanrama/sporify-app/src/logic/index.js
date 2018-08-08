const logic = {
   userId: null,
   userToken: null,
   userUsername: null,
   spotifyToken: null,

   _callUsersApi(path, method = 'get', body) {
        return fetch('skylabcoders.herokuapp.com/api' + path, {
            method,
            headers: {
                // authorization: 'Bearer ' + this.userToken
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .catch(res => {
            if (res.status === 'KO') throw Error('request error, status ' + res.status)
            return res;
        });
    },

    _callSpotifyApi(path) {
        return fetch('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.spotifyToken
            }
        })
        .then(res => res.json())
        .catch(function(err) {
            throw Error('request error, status ' + err.status);
        });
    },

    searchArtists: function (query) {
        return this._callSpotifyApi('/search?type=artist&query=' + query)
            .then(function(res) {
              
                return res.artists.items;
            });
    },

    retrieveAlbumsByArtistId(id) {
        return this._callSpotifyApi('/artists/' + id + '/albums')
            .then(res => res.items);
    },

    retrieveTracksByAlbumId(id) {
        return this._callSpotifyApi('/albums/' + id + '/tracks')
            .then(res => res.items);
    },

    retrieveTrackById(id) {
        return this._callSpotifyApi('/tracks/' + id)
    }
};

// export default logic
if (typeof module !== 'undefined') module.exports = logic