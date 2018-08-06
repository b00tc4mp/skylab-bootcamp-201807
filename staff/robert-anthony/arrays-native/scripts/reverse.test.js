'use strict';

describe('Array.prototype.reverse', function () {
  var array, result;

  beforeEach(function () {
    array = [1, 2, 3, 4];
  });
  it(' reverses an array in place. The first array element becomes the last, and the last array element becomes the first.', function () {
    result = array.reverse();
    expect(result).toEqual([4, 3, 2, 1]);
    expect(result).toBe(array);

  });


});