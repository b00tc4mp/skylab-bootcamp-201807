'use strict';

describe('Array.prototype.fill', function () {
  var array;

  beforeEach(function () {
    array = [1, 2, 3, 4,5];
  });

  it('should mutate array filling values with other value', function () {
    array.fill(0, 2, 4);




    expect(array).toEqual([1, 2, 0, 0, 5])

  });
});