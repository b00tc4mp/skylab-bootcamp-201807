

'use strict';

describe("Array.prototype.copyWithin", function (){
    
    var array;

    beforeEach(function() {
        
        array = [1, 2, 3, 4, 5];

    })

    it ("it should copy a part of the array in the same array without modifying the array", function(){
        var result = array.copyWithin(0, 3, 4);

        expect(array.length).toBe(5);
        expect(array[0]).toBe(4);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5); 

    })
})
