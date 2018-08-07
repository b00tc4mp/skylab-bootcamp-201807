'use strict';

describe('Array.prototype.splice', function () {
  var array, results;

  beforeEach(function () {
    array = ['Jan', 'March', 'April', 'June'];

  });
  it('changes the contents of an array by removing existing elements and/or adding new elements.', function () {

    results = array.splice(1, 0, 'Feb');
    expect(array).toEqual(['Jan', 'Feb', 'March', 'April', 'June']);
    expect(results).toEqual([]);

    results = array.splice(4, 1, 'May');

    expect(array).toEqual(['Jan', 'Feb', 'March', 'April', 'May']);
    expect(results).toEqual(["June"]);


  });


});
