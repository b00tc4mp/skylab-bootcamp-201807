'use strict';

describe('Array.prototype.copyWithin', function () {
  var array;

  beforeEach(function () {
    array = [1, 2, 3, 4, 5];
  });

  it('should copy from one part of array to another correctly', function () {
    array.copyWithin(0, 3, 4)
    expect(array).toEqual([4, 2, 3, 4, 5]);
  });
});