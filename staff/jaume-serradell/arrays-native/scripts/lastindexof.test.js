'use strict';

describe('Array.prototype.lastindexof', function () {
    var animals;

    beforeEach(function () {
        animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
    });

    it('should check and operate correctly', function() {
        //return the last position of the value passed by param - this example is 3 because Dodo is repeated and check the last value repeated
        var result = animals.lastIndexOf('Dodo');
        // expected output: 3

        //return the last position of the value passed by param - this example is 1 because Tiger only appears 1 time
        var result2 = animals.lastIndexOf('Tiger');
        // expected output: 1
        
        expect(result).toBe(3)
        expect(result2).toBe(1)

    });
});