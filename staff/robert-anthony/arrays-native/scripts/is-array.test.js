'use strict';

describe('Array.prototype.isArray', function () {
var array ;

beforeEach(function () {
  array = [1,2,3,4];
});
  it('determines whether the passed value is an Array.', function () {

    expect(Array.isArray(array)).toBeTruthy();



  });

  it('should not modify original array',function () {

    expect(array).toEqual( [1,2,3,4]);
  });


});