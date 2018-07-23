'use strict';

describe('logic (spotify)', function () {
  index.token = 'BQBYmERNRoxF6ZtF0iu8N6RDBMytpPoNDwNRGj2gZ2uYHp5Z1eozoAikOzp3aplJ0pJ_vP2naFidkk0T4OVgjI3jWGHbMWI1ckR6jAt8vWguCLIV1cYFosvd3Rbt9VWFgHaCuaFrZ7MC';
// TO GET TOKEN: https://developer.spotify.com/console/get-search-item/

  describe('search artists', function () {
    it('should find artists matching criteria', function () {
      return index.searchArtists('sisters of mercy')
        .then(function (artists) {

          expect(artists).toBeDefined();
          expect(artists.length).toBe(6);
          expect(artists[0].name).toBe('Sisters of Mercy');
        }).catch(function(error){
          expect(error).toBeDefined();
        });
    });
  });

  describe('retrieve albums by artist id', function () {
    it('should retrieve albums for given artist id', function () {
      return index.retrieveAlbumsByArtistId("4HxBVyHaUa60eCSsJWxwWR")
        .then(function (albums) {
          expect(albums).toBeDefined();
          expect(albums.length).toBe(20);
          expect(albums[10].name).toBe('First and Last and Always');
        }).catch(function(error){
          expect(error).toBeDefined();
        });
    });
  });

  describe('retrieve tracks by album id', function () {
    it('should retrieve tracks for given album id', function () {
      return index.retrieveTracksByAlbumId("2wOuYERNvxVipFb2JlwvwA")
        .then(function (tracks) {
          expect(tracks).toBeDefined();
          expect(tracks.length).toBe(10);
          expect(tracks[0].name).toBe('Black Planet');
        }).catch(function(error){
          expect(error).toBeDefined();
        });
    });
  });


  describe('retrieve track by id', function () {
    it('should retrieve a specific track for a given id', function () {
      return index.retrieveTrackById("7o3wwWcDjjzY4T5YJdQ7Al")
        .then(function (track) {
          expect(track).toBeDefined();
          expect(track.duration_ms).toBe(204186);
          expect(track.name).toBe("Walk Away");

        }).catch(function(error){
          expect(error).toBeDefined();
        });
    });
  });

  describe('retrieve album by id', function () {
    it('should retrieve a specific album for a given id', function () {
      return index.retrieveAlbumById("71t6hGJmP26g2aAoFnTY4G")
        .then(function (album) {
          expect(album).toBeDefined();
          expect(album.name).toBe("Rock 'N' Roll Saviors - The Early Years (Live)");
          expect(album.release_date).toBe("2016-07-15");

        }).catch(function(error){
          console.log("other catch",error)
          expect(error).toBeDefined();
        });
    });
  });
});





