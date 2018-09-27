'use strict';

var logic = {
  token: 'NO-TOKEN',

  _callApi: function _callApi(path) {

    var myURL = 'https://api.spotify.com/v1' + path;
    return $.ajax({
      url: myURL,
      type: 'GET',
      headers: {
        "Authorization": "Bearer " + this.token
      }
    }).then(function (data) {
      return data;
    }).catch(function (error) {
      throw Error('request error, status ' + error);
    });
  },

  searchArtists: function searchArtists(query) {
    return this._callApi('/search?type=artist&query=' + query).then(function (res) {
      return res.artists.items;
    }).catch(function (error) {
      console.log("Error on searching artists", error);
    });
  },

  retrieveAlbumsByArtistId: function retrieveAlbumsByArtistId(id) {
    return this._callApi('/artists/' + id + '/albums').then(function (res) {
      return res.items;
    }).catch(function (error) {
      console.log("Error on retrieving albums", error);
    });
  },
  retrieveTracksByAlbumId: function retrieveTracksByAlbumId(id) {
    return this._callApi('/albums/' + id + '/tracks').then(function (results) {
      return results.items;
    }).catch(function (error) {
      console.log("Error on retrieving tracks by albums id", error);
    });
  },
  retrieveAlbumById: function retrieveAlbumById(id) {
    return this._callApi('/albums/' + id).then(function (results) {
      return results;
    }).catch(function (error) {
      console.log("Error on retrieving album by id", error);
    });
  },
  retrieveTrackById: function retrieveTrackById(id) {
    return this._callApi('/tracks/' + id).then(function (results) {
      return results;
    }).catch(function (error) {
      console.log("Error on retrieving track info", error);
    });
  }
};