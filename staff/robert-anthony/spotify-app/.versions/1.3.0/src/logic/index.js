'use strict';

var index = {
    token: 'NO-TOKEN',

    _callApi: function (path) {

      var myURL = 'https://api.spotify.com/v1' + path;

      return fetch(myURL,{
        type: 'GET',
        headers: {
          "Authorization": "Bearer " + this.token
        }
      }).then(function (data) {
        return data.json();
      }).then(function (res) {
       if (res.error) throw Error('request error, status ' + res.error.status);
       else return res;
      });

    },


    searchArtists: function (query) {
      console.log("searchArtists called with ", query)
      return this._callApi('/search?type=artist&query=' + query)
        .then(function (res) {
          return res.artists.items;
        }).catch(function (error) {
          console.log("Error on searching artists", error);
        });
    },

    retrieveAlbumsByArtistId(id) {
      return this._callApi('/artists/' + id + '/albums')
        .then(function (res) {
          return res.items;
        }).catch(function (error) {
          console.log("Error on retrieving albums", error);
        });
    },

    retrieveTracksByAlbumId(id) {
      return this._callApi('/albums/' + id + '/tracks')
        .then(function (results) {
          return results.items;
        }).catch(function (error) {
          console.log("Error on retrieving tracks by albums id", error);
        });
    },

    retrieveAlbumById(id) {
      return this._callApi('/albums/' + id)
        .then(function (results) {
          return results;
        }).catch(function (error) {
          console.log("Error on retrieving album by id", error);
        });
    }
    ,

    retrieveTrackById(id) {
      return this._callApi('/tracks/' + id)
        .then(function (results) {
          debugger;
          return results;
        }).catch(function (error) {
          console.log("Error on retrieving track info", error);
        });
    }
  }

  // export default logic;
if (typeof module !== "undefined") module.exports = index;