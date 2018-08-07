'use strict';

describe('Array.prototype.sort', function () {
  var array, results;

  beforeEach(function () {
    array = ['March', 'Jan', 'Feb', 'Dec'];

  });
  it('sorts the elements of an array in place and returns the array.', function () {

    results = array.sort();
    expect(results).toEqual(["Dec", "Feb", "Jan", "March"]);
    expect(results).toBe(array);


  });

  it('sorts the elements of an array in place using a compare function  and returns the array.', function () {

    results = array.sort(function compare(a, b) {
      if (a < b) {
        return -1;

      }
      if (a > b) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    expect(results).toEqual(["Dec", "Feb", "Jan", "March"]);
    expect(results).toBe(array);


  });


});