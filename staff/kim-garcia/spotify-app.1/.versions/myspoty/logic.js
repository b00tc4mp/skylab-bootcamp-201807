var logic = {  //creamos un objeto llamado logic
    token: 'NO-TOKEN',

    _callApi: function(path){
        return $.ajax('https://api.spotify.com/v1-' + path, {   //esta es la API de spoty, dependiendo del path que le pasamos hara cosas
            headers: {
                authorization: 'Bearer ' + this.token
            }
        })
        .catch(function(err){
            throw Error('request error, status ' + err.status);
        });
    }, 
 
    searchArtists: function (query) {
        return this._callApi('/search?type=artist&query=' + query) //query es lo q se escribe en el buscador
            .then(function(res) {  //de donde coje el res, el then hace esto? coje un valor. que es el res? un objeto? Res es la respuesto de ajax (de la promesa de ajax)
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

}