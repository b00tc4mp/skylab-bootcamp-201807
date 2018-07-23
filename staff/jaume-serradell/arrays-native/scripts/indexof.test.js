'use strict';

describe('Array.prototype.indexof', function () {
    var beasts;

    beforeEach(function () {
        beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    });

    it('should include and operate correctly', function() {
        //return the position of value passed by param
        var result = beasts.indexOf('bison');
        // expected output: 1

        //start from 'bison' count 2
        var result2 = beasts.indexOf('bison', 2);
        // expected output: 4

        //'giraffe return -1 because it is not in the array
        var result3 = beasts.indexOf('giraffe');
        // expected output: -1
        
        expect(result).toBe(1);
        expect(result2).toBe(4);
        expect(result3).toBe(-1);

    });
});