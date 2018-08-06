'use strict';

describe('Array.prototype.includes', function () {
  var result;
  var array, array2
  beforeEach(function () {

  });

  beforeEach(function () {
    array = [1, 2, 3];
    array2 = ['cat', 'dog', 'bat'];
  });

  it('should say whether it includes element', function () {

    expect(array.includes(2)).toBeTruthy();
    expect(array2.includes('cat')).toBeTruthy();
    expect(array2.includes('at')).toBeFalsy();


  });

  it('should not modify original array',function () {

    expect(array).toEqual( [1, 2, 3]);
    expect(array2).toEqual(['cat', 'dog', 'bat']);
  });


});

/*
var array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

var pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false

*/
