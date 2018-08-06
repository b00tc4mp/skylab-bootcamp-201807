
'use strict';

describe('Array.prototype.reverse', function () {
    var numbers;
    
   
   
    beforeEach(function () {
         numbers = [65, 44, 12, 4];

    });

    it('Reduces the array to a single value.', function() {
       

        var result=numbers.reduce(getSum);
        
        function getSum(total, num) {
            return total + num;
        }
        
        expect(result).toBe(125);
       
       
    });
});


