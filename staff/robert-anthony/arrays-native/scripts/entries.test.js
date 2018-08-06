'use strict';

describe('Array.prototype.entries', function () {
  var array, arrayOfObjects;

  beforeEach(function () {
    array = ['a', 'b', 'c'];
    arrayOfObjects = [{a: 23, b: 34}, {a: 44, b: 13}, {a: 100, b: 65}];
  });

  it('should return iterator', function () {
    var result = array.entries();
    console.log(typeof result);

    expect(typeof  result[Symbol.iterator]).toEqual("function");

  });

  it('should return an iterator that gives key/value pairs for each entry in array', function () {
    var iter = arrayOfObjects.entries();
    var result = iter.next();
    expect(result).toEqual({done: false, value: [0, {a: 23, b: 34}]});
  });

});