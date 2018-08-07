'use strict';

describe('Array.prototype.join', function () {
var array ;

beforeEach(function () {
  array = [1,2,3,4];
});
  it('Joins all elements of an array into a string', function () {

    expect(array.join(",")).toEqual("1,2,3,4");
    expect(array.join()).toEqual("1,2,3,4");
    expect(array.join("")).toEqual("1234");



  });

  it('should not modify original array',function () {

    expect(array).toEqual( [1,2,3,4]);
  });


});