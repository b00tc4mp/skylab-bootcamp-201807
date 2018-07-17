'use strict';

describe('logic (spotify)', function () {
  logic.token = 'BQDyypeVY65TKVrioXwMtORLk399xhwY9o610llpTzspxICiQMasE1bNEjv9svCuEnnNpQRj_q0aWrpoEfK6MNZ59DZz91_LowyRNlsqluSkg7AesHP7rEO67vgABm160sJtZ-RqOE5k';

  describe('search artists', function () {
    it('should find artists matching criteria', function () {
      return logic.searchArtists('sisters of mercy')
        .then(function (artists) {

          expect(artists).toBeDefined();
          expect(artists.length).toBe(6);
          expect(artists[0].name).toBe('Sisters of Mercy');
        });
    });
  });

  describe('retrieve albums by artist id', function () {
    it('should retrieve albums for given artist id', function () {
      return logic.retrieveAlbumsByArtistId("4HxBVyHaUa60eCSsJWxwWR")
        .then(function (albums) {
          console.log(albums)
          expect(albums).toBeDefined();
          expect(albums.length).toBe(20);
          expect(albums[10].name).toBe('First and Last and Always');
        });
    });
  });

  describe('retrieve tracks by album id', function () {
    it('should retrieve tracks for given album id', function () {
      return logic.retrieveTracksByAlbumId("2wOuYERNvxVipFb2JlwvwA")
        .then(function (tracks) {
          expect(tracks).toBeDefined();
          expect(tracks.length).toBe(10);
          expect(tracks[0].name).toBe('Black Planet');
        });
    });
  });


  describe('retrieve track by id', function () {
    it('should retrieve a specific track for a given id', function () {
      return logic.retrieveTrackById("7o3wwWcDjjzY4T5YJdQ7Al")
        .then(function (track) {
          expect(track).toBeDefined();
          expect(track.duration_ms).toBe(204186);
          expect(track.name).toBe("Walk Away");

        });
    });
  });
});





