'use strict';

const assert = require('assert');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Storage = require('@google-cloud/storage');
const uuid = require('uuid');

const vision = require('.');

describe('Vision', function() {
  const IMAGES = Object.freeze({
    document: path.join(__dirname, 'data/document.jpg'),
    logo: path.join(__dirname, 'data/logo.jpg'),
    rushmore: path.join(__dirname, 'data/rushmore.jpg'),
    text: path.join(__dirname, 'data/text.png'),
    malformed: __filename,
  });

  const TESTS_PREFIX = 'gcloud-vision-test';

  let storage = new Storage();
  let client = new vision.v1.ImageAnnotatorClient();

  let bucket = storage.bucket(generateName());

  before(function(done) {
    bucket.create(function(err) {
      if (err) {
        done(err);
        return;
      }

      bucket.upload(IMAGES.logo, done);
    });
  });

  after(function(done) {
    storage.getBuckets(
      {
        prefix: TESTS_PREFIX,
      },
      function(err, buckets) {
        if (err) {
          done(err);
          return;
        }

        function deleteBucket(bucket, callback) {
          bucket.deleteFiles(function(err) {
            if (err) {
              callback(err);
              return;
            }

            bucket.delete(callback);
          });
        }

        async.each(buckets, deleteBucket, done);
      }
    );
  });

  it('should detect from a URL', () => {
    var url = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png';
    return client.logoDetection(url).then(responses => {
      var response = responses[0];
      assert.deepStrictEqual(response.logoAnnotations[0].description, 'Google');
    });
  });

  it('should detect from a filename', () => {
    return client.logoDetection(IMAGES.logo).then(responses => {
      var response = responses[0];
      assert.deepStrictEqual(response.logoAnnotations[0].description, 'Google');
    });
  });

  it('should detect from a Buffer', () => {
    var buffer = fs.readFileSync(IMAGES.logo);
    return client.logoDetection(buffer).then(responses => {
      var response = responses[0];
      assert.deepStrictEqual(response.logoAnnotations[0].description, 'Google');
    });
  });

  describe('single image', () => {
    var TYPES = [
      {type: 'FACE_DETECTION'},
      {type: 'LABEL_DETECTION'},
      {type: 'SAFE_SEARCH_DETECTION'},
    ];
    it('should perform multiple detections', () => {
      return client
        .annotateImage({
          features: TYPES,
          image: {source: {filename: IMAGES.rushmore}},
        })
        .then(responses => {
          var response = responses[0];
          assert(response.faceAnnotations.length >= 1);
          assert(response.labelAnnotations.length >= 1);
          assert(response.safeSearchAnnotation !== null);
        });
    });
  });

  function generateName() {
    return TESTS_PREFIX + uuid.v1();
  }
});