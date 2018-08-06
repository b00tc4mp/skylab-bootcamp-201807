'use strict';

describe('Array.prototype.unshift', function () {
  var array,result;

  beforeEach(function () {
    array = [1, 2, 3, 4];
  });
  it('adds one or more elements to the beginning of an array and returns the new length of the array.', function () {
    result = array.unshift(5);
    expect(result).toBe(5);
    expect(array).toEqual([5,1,2,3,4]);



  });


});