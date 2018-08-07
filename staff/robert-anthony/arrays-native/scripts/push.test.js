'use strict';

describe('Array.prototype.push', function () {
  var array,result;

  beforeEach(function () {
    array = [1, 2, 3, 4];
  });
  it(' adds one or more elements to the end of an array and returns the new length of the array', function () {
    result = array.push(8,9);
    expect(result).toBe(array.length);
    expect(array).toEqual([1, 2, 3,4,8,9]);


  });


});