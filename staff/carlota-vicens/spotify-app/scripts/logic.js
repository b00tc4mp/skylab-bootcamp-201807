"use strict";

var logic = {
    token: 'BQAzTK0dGYUH8s7-lPZY21eWa9eQcdRCI1D5mgEKzDAR83LOF0HP8BWs6Fk4-Dlbtr2RiGTYtNyBqhzqr6Q9ZTSqF6VAs4R2RSan0t0sbXX815to0f3L7bKcY-BnE88xWH4CGqwhb9A',

    _callApi: function (path) {
        return $.ajax('https://api.spotify.com/v1-' + path, {
            headers: {
                authorization: 'Bearer ' + this.token
            }
        })
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