'use strict';

describe('Array.prototype.reverse', function () {
    var array1;

    beforeEach(function () {
        array1 = ['one', 'two', 'three'];
    });

    it('should reverse and operate correctly', function() {
        //Reverse the value of the array. From the end to start
        var result = array1.reverse();
        // expected output: 'three', 'two', 'one'
        
        expect(result).toEqual(['three', 'two', 'one'])

    });
});