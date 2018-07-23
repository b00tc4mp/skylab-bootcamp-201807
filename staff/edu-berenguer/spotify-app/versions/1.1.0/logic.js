var logic = {
    token: 'BQAQIMLbbf8lnrIuu1C9rPGWUmRDx1WoEdeJEkCGoE0j5gUXsEk0EREsdBepjIDii6WhDRTsvaHjIUznTVk0Zf3LUNwYWY69TucXweHaXGYK3ld1pQaP21e-zbDJN5cj0AzInFKogXPoQYA-cuc',

    _callApi: function (path) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            var url = 'https://api.spotify.com/v1' + path;
            request.open('get', url);

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var res = JSON.parse(request.responseText);
                        
                        resolve(res);
                        
                    } else reject(Error('request error, status ' + request.status));
                }
            };

            
            request.setRequestHeader('Authorization', 'Bearer ' + this.token);

            request.send();
        }.bind(this));

    },

    _callAjax: function (path) {
        var url = 'https://api.spotify.com/v1' + path;
        $.ajax(url)
        .then(function(res){console.log("hola")})
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

    retrieveTrackById(id){
        return this._callApi('/tracks/' + id)
            .then(function(res) {
                return res;
            });
    }
};