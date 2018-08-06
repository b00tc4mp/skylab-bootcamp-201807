'use strict';

describe('Array.prototype.findIndex', function () {
  var array;
  var result;

  beforeEach(function () {
    array = [5, 12, 8, 130, 44];
  });

  it('should return first index of object found', function () {
    result = array.findIndex(function (element) {
      return element > 13;
    });
    expect(result).toBe(3);

  });



});