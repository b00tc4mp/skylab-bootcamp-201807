
'use strict'

var logic = {
    //token: 'NO-TOKEN',
    token: 'BQDnn9KtFQMd3uBgyGujrZ1La49UI2gNN4IcbGA9wJmJzEi_nW-oKmdCGtHn1b_miSrGdM4iAMGjiW2-wpO5nO34iJdJo67grFc8go8NV-se5K-kjgRD2gTCQvTxx4XwcX4xrLSKFGMCHVQbc0p7hGNXdAH6fU4',

    _callApi: function (path) {
        var url = 'https://api.spotify.com/v1' + path;

        return $.ajax({
                url: url,
                type: 'GET',
                headers: {"Authorization": 'Bearer ' + this.token}
            }).done(function(result) {
                return result;
            });
    },

    searchArtists: function (query) {
        return $.when(this._callApi('/search?type=artist&query=' + query))
            .then(function(res) {
                return res.artists.items;
            });
    },

    retrieveAlbumsByArtistId(id) {
        return $.when(this._callApi('/artists/' + id + '/albums'))
            .then(function(res) {
                return res.items;
            });
    },

    retrieveTracksByAlbumId(id) {
        return $.when(this._callApi('/albums/' + id + '/tracks'))
            .then(function(res) {
                return res.items;
            });
    },


    retrieveTrackById(id) {
        return $.when(this._callApi('/tracks/' + id))
            .then(function(res){
                return res;
            });
    },

    searchAlbumsByQuery: function (query) {
        return $.when(this._callApi('/search?type=album&query=' + query))
            .then(function(res) {
                return res.albums.items;
            });
    },


    retrieveAlbumsById(id) {
        return $.when(this._callApi('/albums/' + id))
            .then(function(res){
                return res;
            });
    },
};