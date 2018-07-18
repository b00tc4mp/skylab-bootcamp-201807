
'use strict'

var logic = {
    //token: 'NO-TOKEN',
    token: 'BQDs6ZT_4pycVnl5pNcm74U1GtEFS7ENooZHQHkHdfKk9wfBX1yrnbJzbaU9Buo_XySpThs3zGpxm-9DM43O2yEC2YC_vJiwaTDcX37sPjYRKJF_zqRST98s66VWZSjlVR8qoUOKwMfKQbWucMv_R8hNLHQszAY',

    _callApi: function (path) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var res = JSON.parse(request.responseText);

                        resolve(res);
                    } else reject(Error('request error, status ' + request.status));
                }
            };

            var url = 'https://api.spotify.com/v1' + path;

            request.open('get', url);

            request.setRequestHeader('Authorization', 'Bearer ' + this.token);


            request.send();
        }.bind(this));

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