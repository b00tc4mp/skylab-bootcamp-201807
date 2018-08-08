'use strict'

describe('Array.prototype.entries()', function() {


    it('Returns a new Array Iterator object that contains the key/value pairs for each index in the array.', function() {
        var array = ['a', 'b', 'c'];

        var iterator = array.entries();

        var iterator1Array = iterator.next().value;
        // expected output: Array [0, "a"]
        expect(iterator1Array.length).toBe(2);
        expect(iterator1Array[0]).toBe(0); // key: 0
        expect(iterator1Array[1]).toBe('a'); // value[0]


        var iterator2Array = iterator.next().value;
        // expected output: Array [1, "b"]
        expect(iterator2Array.length).toBe(2);
        expect(iterator2Array[0]).toBe(1); // key: 1
        expect(iterator2Array[1]).toBe('b'); // value[1]

    });

});