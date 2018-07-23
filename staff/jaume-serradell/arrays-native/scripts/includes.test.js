'use strict';

describe('Array.prototype.includes', function () {
    var pets;

    beforeEach(function () {
        pets = ['cat', 'dog', 'bat'];
    });

    it('should include and operate correctly', function() {
        //check if the value passed on the param is include in the array and return a boolean
        var result = pets.includes('cat');
        // expected output: true
        
        expect(result).toBe(true);
        expect(pets.includes('mouse')).toBe(false);

    });
});