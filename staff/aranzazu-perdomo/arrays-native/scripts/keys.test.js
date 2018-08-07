'use strict';

describe('Array.prototype.keys', function () {
    var array1;
    var keys=[];
    beforeEach(function () {
         array1 = ['a', 'b', 'c'];
    });

    it('returns a new Array Iterator object that contains the keys for each index in the array.', function() {
      debugger 
        var iterator = array1.keys(); // expected output: 0 1 2

        for(var key of iterator){
debugger;
            keys.push(array1[key]);
          
            
        }

        
        expect(keys.length).toBe(3);
        expect(keys[0]).toBe("a");
    });
});


