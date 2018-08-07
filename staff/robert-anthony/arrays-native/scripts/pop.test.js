'use strict';

describe('Array.prototype.pop', function () {
  var array,result;

  beforeEach(function () {
    array = [1, 2, 3, 4];
  });
  it('removes the last element from an array and returns that element. This method changes the length of the array.', function () {
    result = array.pop();
    expect(result).toBe(4);
    expect(array).toEqual([1, 2, 3]);


  });


});