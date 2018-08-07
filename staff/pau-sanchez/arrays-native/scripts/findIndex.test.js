'use strict';

describe('Array.prototype.findIndex', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should operate correctly', function() {
        var findThree = function (item){
            return item === 3;}
                
        var result = (function (){
            return array.findIndex(findThree);
        });

        expect(result()).toBe(2);
        
       
    });
});