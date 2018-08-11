'use strict';

describe('Array.prototype.entries', function () {
    var array1;
    

    beforeEach(function () {
        array1 = ['a', 'b', 'c'];
      
    });

    it('returns a new Array Iterator object that contains the key/value pairs for each index in the array', function() {
        var iterator1 = array1.entries();
        var result = iterator1.next().value;
        var a= "a";

        

        expect(array1.length).toBe(3);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(a);
        
        
       
    });
});