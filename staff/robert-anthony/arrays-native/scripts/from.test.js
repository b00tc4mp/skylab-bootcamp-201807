'use strict';

describe('Array.prototype.from', function () {
  var result;
  var input1, input2;

  beforeEach(function () {
    input1 = "foo";
    input2 = [1, 2, 3];
  });

  it('should return array from input', function () {

    result = Array.from(input1);
    expect(input1).toBe("foo");
    expect(result).toEqual(["f", "o", "o"]);
    result = Array.from(input2, x => x + x);
    expect(result).toEqual([2, 4, 6]);
    expect(input2).toEqual([1, 2, 3]);
  });


});

/*
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
*/
