'use strict';

describe('Array.prototype.splice', function () {
    var months;
    var removed;

    beforeEach(function () {
        months = ['Jan', 'March', 'April', 'June'];
    });

    it('should splice and operate correctly', function() {
        //Add value passed by param at position 1, remove 0 items and add 'Feb'
        months.splice(1, 0, 'Feb');
        // expected output: 'Jan', 'Feb', 'March', 'April', 'June'

        //Add value passed by param at position 4, replace the item 'June' because it is in 4th position and add 'May'
        removed = months.splice(4, 1, 'May');
        // expected output: 'Jan', 'Feb', 'March', 'April', 'May'
        
        expect(months).toEqual(['Jan', 'Feb', 'March', 'April', 'May'])
        expect(removed).toEqual(['June'])

    });
});