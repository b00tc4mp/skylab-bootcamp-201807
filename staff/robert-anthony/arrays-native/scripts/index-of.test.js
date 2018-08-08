'use strict';

describe('Array.prototype.findIndex', function () {
  var array;


  beforeEach(function () {
    array =  ['ant', 'bison', 'camel', 'duck', 'bison'];
  });

  it('return the first index at which a given element can be found in the array, or -1 if it is not present', function () {

    expect(array.indexOf('bison')).toBe(1);
    expect(array.indexOf('snake')).toBe(-1);



  });

  it('should not modify original array',function () {

    expect(array).toEqual(  ['ant', 'bison', 'camel', 'duck', 'bison']);
  });


});