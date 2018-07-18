var logic = {
  token: 'NO-TOKEN',

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
      .then(function (res) {
        return res.artists.items;

      }).catch(function(error){
        console.log("Error on searching artists",error);
      });
  },

  retrieveAlbumsByArtistId(id) {
    return this._callApi('/artists/' + id + '/albums')
      .then(function (res) {
        return res.items;
      }).catch(function(error){
        console.log("Error on retrieving albums",error);
      });
  },

  retrieveTracksByAlbumId(id) {
    return this._callApi('/albums/' + id + '/tracks')
      .then(function (results) {
        return results.items;
      }).catch(function(error){
        console.log("Error on retrieving tracks by albums id",error);
      });
  },

  retrieveAlbumById(id) {
    return this._callApi('/albums/' + id )
      .then(function (results) {
        return results;
      }).catch(function(error){
        console.log("Error on retrieving album by id",error);
      });
  },

  retrieveTrackById(id) {
    return this._callApi('/tracks/' + id)
      .then(function (results) {
        return results;
      }).catch(function(error){
        console.log("Error on retrieving track info",error);
      });
  }
};