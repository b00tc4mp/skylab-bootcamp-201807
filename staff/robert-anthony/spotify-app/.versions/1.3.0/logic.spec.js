'use strict';

describe('logic (spotify)', function () {
  logic.token = 'BQBYBsrDk2VG1kxOCys68AT4mTOA5xN8uZiS3POoir87oyxYRJDJ0Qr3f8DchOn0SgTuQgNeo64S4LAOEes7dmGicNtqIKw22e_MSnJTFTPeTGodNrki1hv8l3IRSTqVdKH_KPTIcxxc';

  describe('search artists', function () {
    it('should find artists matching criteria', function () {
      return logic.searchArtists('sisters of mercy').then(function (artists) {

        expect(artists).toBeDefined();
        expect(artists.length).toBe(6);
        expect(artists[0].name).toBe('Sisters of Mercy');
      }).catch(function (error) {
        expect(error).toBeDefined();
      });
    });
  });

  describe('retrieve albums by artist id', function () {
    it('should retrieve albums for given artist id', function () {
      return logic.retrieveAlbumsByArtistId("4HxBVyHaUa60eCSsJWxwWR").then(function (albums) {
        expect(albums).toBeDefined();
        expect(albums.length).toBe(20);
        expect(albums[10].name).toBe('First and Last and Always');
      }).catch(function (error) {
        expect(error).toBeDefined();
      });
    });
  });

  describe('retrieve tracks by album id', function () {
    it('should retrieve tracks for given album id', function () {
      return logic.retrieveTracksByAlbumId("2wOuYERNvxVipFb2JlwvwA").then(function (tracks) {
        expect(tracks).toBeDefined();
        expect(tracks.length).toBe(10);
        expect(tracks[0].name).toBe('Black Planet');
      }).catch(function (error) {
        expect(error).toBeDefined();
      });
    });
  });

  describe('retrieve track by id', function () {
    it('should retrieve a specific track for a given id', function () {
      return logic.retrieveTrackById("7o3wwWcDjjzY4T5YJdQ7Al").then(function (track) {
        expect(track).toBeDefined();
        expect(track.duration_ms).toBe(204186);
        expect(track.name).toBe("Walk Away");
      }).catch(function (error) {
        expect(error).toBeDefined();
      });
    });
  });

  describe('retrieve album by id', function () {
    it('should retrieve a specific album for a given id', function () {
      return logic.retrieveAlbumById("71t6hGJmP26g2aAoFnTY4G").then(function (album) {
        expect(album).toBeDefined();
        expect(album.name).toBe("Rock 'N' Roll Saviors - The Early Years (Live)");
        expect(album.release_date).toBe("2016-07-15");
      }).catch(function (error) {
        console.log("other catch", error);
        expect(error).toBeDefined();
      });
    });
  });
});