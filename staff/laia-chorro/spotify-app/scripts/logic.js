var logic = {
    token: 'NO-TOKEN',
    //token: 'BQAHo6bDIpyJL6Ohc4-nqaI2oyb7NDRuhcSzdnaWIzE8Sxz8kdCsroSDz9oAfmhepiRAI9tSHBl8jNl3vhisDp_Cmil4qc9fRvuDcLbTsP-LfHldg55RV15o7nIr7-1dlMr6COAH-EvlZU5WDdoh3asdFG4vU7g',

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
    }
};