var logic = {
    token: 'BQAc1croyFKkNn0OU2h-qv2GNKhVktUAhibj5ed7dItnMLz3tgYHRSKmst01YzgKi6LIcmTIXKt0DOCmT2BS-LqPpR35VI90s-YSoS7AeWGmGdRIzY06UQWg8AeIW2fTvTrfuknU8NRYtanPb-oMeyM6Tsn8CIDyXIA',

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