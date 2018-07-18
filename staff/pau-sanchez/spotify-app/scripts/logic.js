debugger;
var logic = {
    token: 'BQBlPZeAPJPZ-4BTzJJTsML4FE34_JyRhn1zwrYRtuCRkFz5UeDp-CPH0AcLqXsmgQvReEoK4Kvu0fcnc5uecRl0Tiz8lfUw4lcYirtt2ilIzGE6-HLWOWmJNPZXUeDXHl-0ZrdcUOPTrAGjSlZnjsi7dnP2EjDA8a_eQcUPo3iywMrm',
    
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
                //console.log(res.artists.items)
                return res.artists.items;
            //.then(console.log(res.artists.items))    
            });
    },

    retrieveAlbumsByArtistId(id) {
        return this._callApi('/artists/' + id + '/albums')
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTracksByAlbumId(albumId) {
        return this._callApi('/albums/' + albumId + '/tracks')
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTrackById(trackId) {
        return this._callApi('/tracks/' + trackId  + '/')
            .then(function(res) {
                return res.items;
            });
    },

    playTrackById(id){
        return ('<iframe src="https://open.spotify.com/embed?uri=spotify:track:'+ id+'" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>')
    }
};


//"7vTCGXUv3XOKScExgMtmel"