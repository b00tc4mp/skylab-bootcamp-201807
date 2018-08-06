'use strict';

describe('Array.prototype.sort', function () {
    var months;
    var array1;

    beforeEach(function () {
        months = ['March', 'Jan', 'Feb', 'Dec'];
        array1 = [1, 30, 4, 21];
    });

    it('should sort and operate correctly', function() {
        //Sort the array alphabetically
        var result = months.sort();
        // expected output: 'Dec', 'Feb', 'Jan', 'March'

        //Sort the array numerically - sort by the first number of the value
        var result2 = array1.sort();
        // expected output: 1, 21, 30, 4
        
        expect(result).toEqual(['Dec', 'Feb', 'Jan', 'March'])
        expect(result2).toEqual([1, 21, 30, 4])

    });
});