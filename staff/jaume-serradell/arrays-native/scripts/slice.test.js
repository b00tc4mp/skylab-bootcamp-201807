'use strict';

describe('Array.prototype.slice', function () {
    var animals;

    beforeEach(function () {
        animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    });

    it('should slice and operate correctly', function() {
        //Substract the values of the array starting at position 2
        var result = animals.slice(2)
        // expected output: 'camel', 'duck', 'elephant'

        //Substract the values of the array starting at position 2 and ending at position 3 (end position is not included)
        var result2 = animals.slice(2,4)
        
        expect(result).toEqual(['camel', 'duck', 'elephant'])
        expect(result2).toEqual(['camel', 'duck'])

    });
});