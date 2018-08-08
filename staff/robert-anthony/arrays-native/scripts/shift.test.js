'use strict';

describe('Array.prototype.shift', function () {
  var array,result,array2,result2;

  beforeEach(function () {
    array = [1, 2, 3, 4];
     array2 = [];
  });
  it(' removes the first element from an array and returns that removed element. This method changes the length of the array.', function () {
    result = array.shift();
    expect(result).toBe(1);
    expect(array).toEqual([2,3,4]);
     result2 = array2.shift();
    expect(result2).toBeUndefined();
    expect(array2).toEqual([]);



  });


});