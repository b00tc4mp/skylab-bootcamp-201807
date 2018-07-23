var logic = {
    token: 'BQAI4WG5Rqp83cGznCC4mRdtasmar5rxZGMmi0EL7Gtw90kFtC6B2VD_LGaJhR1zHeVlWZd1UOEhuJGot_6d2tcvfay8WAMJoQ3fg9Z2wcKvldzz25qSwVh3jAF89p5Rj5rSnsS_tM0z78F399loGnLxbnuaZIWBejQ',

    _callApi: function (path) {

        return fetch('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.token
            }
        })
        .then(function (res){return res.json()})
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

//export default logic;
if (typeof module !=='undefined') module.exports = logic;



// _callApi: function (path) {

//     return fetch('https://api.spotify.com/v1' + path, {
//         headers: {
//             authorization: 'Bearer ' + this.token
//         }
//     })
//     .then(function (res){return res.json()})
//     .catch(function(err) {
//         throw Error('request error, status ' + err.status);
//     });
// },

//async-await

// _callApi: async function (path) {
//     const response = await fetch('https://api.spotify.com/v1' + path, {
//                 headers: {
//                     authorization: 'Bearer ' + this.token
//                 }
//             })
//     const data = await response.json()
//     return data;
// },