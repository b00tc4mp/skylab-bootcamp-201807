'use strict';

describe('Array.prototype.every', function () {
  var array;

  beforeEach(function () {
    array = [1,2,3,4,5];
  });

  it('should pass "every" test', function() {
    var result = array.every(function (element) {
      return (element > 0) && (element < 8);
    });

    expect(array.length).toBe(5);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
    expect(array[4]).toBe(5);

   expect(result).toBeTruthy();
  });
});