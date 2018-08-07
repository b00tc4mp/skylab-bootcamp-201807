'use strict';

describe('Array.prototype.concat', function () {
    var array1;
    var array2;

    beforeEach(function () {
        array1 = ['a', 'b', 'c'];
        array2 = ['d', 'e', 'f'];
    });

    it('should concat and operate correctly', function() {
        // concat array1 with array2
        var result = array1.concat(array2);
        //result = ['a', 'b', 'c', 'd', 'e', 'f'];
        
        expect(result).toEqual(["a", "b", "c", "d", "e", "f"])
        expect(result.length).toBe(6)
        expect(result[0]).toBe("a");
        expect(result[1]).toBe("b");
        expect(result[2]).toBe("c");
        expect(result[3]).toBe("d");
        expect(result[4]).toBe("e");
        expect(result[5]).toBe("f");

    });
});