'use strict';

describe('Array.prototype.concat', function () {
  var array;
  var array2;

  beforeEach(function () {
    array = [1, 2, 3, 4, 5];
    array2 = ["a", "b", "c"];
  });

  it('should return array concatenation without changing original array', function () {
    var result = array.concat(array2);

    expect(array.length).toBe(5);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
    expect(array[4]).toBe(5);
    expect(array2.length).toBe(3);
    expect(array2[0]).toBe("a");
    expect(array2[1]).toBe("b");
    expect(array2[2]).toBe("c");


    expect(result).toEqual([1, 2, 3, 4, 5, "a", "b", "c"])

  });
});