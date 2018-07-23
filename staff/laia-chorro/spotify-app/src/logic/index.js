
'use strict'

var logic = {
    //token: 'NO-TOKEN',
    token: 'BQDs6ZT_4pycVnl5pNcm74U1GtEFS7ENooZHQHkHdfKk9wfBX1yrnbJzbaU9Buo_XySpThs3zGpxm-9DM43O2yEC2YC_vJiwaTDcX37sPjYRKJF_zqRST98s66VWZSjlVR8qoUOKwMfKQbWucMv_R8hNLHQszAY',

    _callApi: function (path) {
      let url = 'https://api.spotify.com/v1' + path;

    return fetch(url, 
                {headers: { 
                    authorization: 'Bearer ' + this.token
                }
        })
        .then((response) => {
                return response.json();
        }).catch(function(err){
                throw Error('request error, status ' + err.status);
        })

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
            .then(function(res){
                return res;
            });
    },

    searchAlbumsByQuery: function (query) {
        return this._callApi('/search?type=album&query=' + query)
            .then(function(res) {
                return res.albums.items;
            });
    },


    retrieveAlbumsById(id) {
        return this._callApi('/albums/' + id)
            .then(function(res){
                return res;
            });
    },
};

//export default logic;
// com no funciona al navegador l'export s'ha de transpilar a js 5 així:
if (typeof module !== 'undefined') module.exports = logic