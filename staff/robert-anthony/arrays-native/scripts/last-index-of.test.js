'use strict';

describe('Array.prototype.lastIndexOf', function () {
  var array;


  beforeEach(function () {
    array =  ['ant', 'bison', 'camel', 'duck', 'bison'];
  });

  it('returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.', function () {

    expect(array.lastIndexOf('bison')).toBe(4);
    expect(array.lastIndexOf('snake')).toBe(-1);



  });

  it('should not modify original array',function () {

    expect(array).toEqual(  ['ant', 'bison', 'camel', 'duck', 'bison']);
  });


});