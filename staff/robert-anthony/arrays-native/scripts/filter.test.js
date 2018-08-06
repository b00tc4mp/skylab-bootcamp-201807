'use strict';

describe('Array.prototype.filter', function () {
  var array;
  var result;

  beforeEach(function () {
    array = [{age: 22}, {age: 55}, {age: 2}, {age: 44}];
  });

  it('should return filtered array', function () {
    result = array.filter(function (element) {
      return (element.age % 2 == 0);
    });

    expect(array).toEqual([{age: 22}, {age: 55}, {age: 2}, {age: 44}]);


    expect(result).toEqual([{age: 22}, {age: 2}, {age: 44}]);


  });
});