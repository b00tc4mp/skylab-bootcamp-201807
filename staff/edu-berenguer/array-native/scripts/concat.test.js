'use strict';

describe('Array.prototype.concat', function () {
    var array1;
    var array2;
    var result;
    
    beforeEach(function () {
        array1= ["a","b","c"];
        array2= ["d","e","f"];
    });

    it('should iterate and operate correctly', function() {
            
        result = array1.concat(array2);
        expect(result[0]).toEqual("a","b","c","d","e","f"); 
        expect(result[0]).toBe("a"); 
        expect(result[1]).toBe("b");
        expect(result[2]).toBe("c");
        expect(result[3]).toBe("d");
        expect(result[4]).toBe("e");
        expect(result[5]).toBe("f");

    });
});
