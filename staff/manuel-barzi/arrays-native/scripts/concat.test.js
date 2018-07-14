'use strict';

describe('Array.prototype.concat', function () {
    var array;
    var array2;

    beforeEach(function () {
       array=[0,1,2]
       array2=[3,4,5]
    });

    it('create new array add two array ', function() {
        var result =array.concat(array2);


        

        expect(result.length).toBe(6);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
        expect(result[3]).toBe(3);
        expect(result[4]).toBe(4);
        expect(result[5]).toBe(5);
       
    });
});