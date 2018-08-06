'use strict';

describe('Array.prototype.tostring', function () {
    var array1;

    beforeEach(function () {
        array1 = [1, 2, 'a', '1a'];
    });

    it('should convert and operate correctly', function() {
        //Convert the array to string
        var result = array1.toString()
        // expected output: '1,2,a,1a'
        
        expect(result).toBe('1,2,a,1a')

    });
});