'use strict';

describe('Array.prototype.lastIndexOf', function () {
  var array;


  beforeEach(function () {
    array =  ['ant', 'bison', 'camel', 'duck', 'bison'];
  });

  it('returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.', function () {

    expect(array.slice(1,4)).toEqual(['bison','camel','duck']);
    expect(array.slice(2)).toEqual(['camel','duck','bison']);

  });

  it('should not modify original array',function () {

    expect(array).toEqual(  ['ant', 'bison', 'camel', 'duck', 'bison']);
  });


});