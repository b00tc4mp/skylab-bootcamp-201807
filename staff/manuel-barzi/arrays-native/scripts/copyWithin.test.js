'use strict';

describe('Array.prototype.copyWithin', function () {
    var array1;
    

    beforeEach(function () {
        array1 = [1, 2, 3, 4, 5];
      
    });

    it('create new array add two array ', function() {
        var result = array1.copyWithin(0, 3, 4);


        

        expect(result.length).toBe(5);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
        expect(result[4]).toBe(5);
        
       
    });
});