'use strict'

describe('Array.prototype.concat', function() {
    it('Merge two arrays into new array.', function() {
        var array1 = ['a', 'b', 'c'],
            array2 = ['d', 'e', 'f'],
            newArray = array1.concat(array2);
        

            // Original array1 and array2 remain the same after concat();
            expect(array1.length).toBe(3);
            expect(array1[0]).toBe('a');
            expect(array1[1]).toBe('b');
            expect(array1[2]).toBe('c');

            expect(array2.length).toBe(3);
            expect(array2[0]).toBe('d');
            expect(array2[1]).toBe('e');
            expect(array2[2]).toBe('f');
    
            expect(newArray.length).toBe(array1.length + array2.length);
            expect(newArray[0]).toBe(array1[0]);
            expect(newArray[1]).toBe(array1[1]);
            expect(newArray[2]).toBe(array1[2]);
            expect(newArray[3]).toBe(array2[0]);
            expect(newArray[4]).toBe(array2[1]);
            expect(newArray[5]).toBe(array2[2]);
        
    });

    it('Merge three arrays into new array.', function() {
        var array1 = [1, 2],
            array2 = ['d', 'e'],
            array3 = [3, 4],
            newArray = array1.concat(array2, array3);

        expect(newArray.length).toBe(array1.length + array2.length + array3.length);
        expect(newArray[0]).toBe(array1[0]);
        expect(newArray[1]).toBe(array1[1]);
        expect(newArray[2]).toBe(array2[0]);
        expect(newArray[3]).toBe(array2[1]);
        expect(newArray[4]).toBe(array3[0]);
        expect(newArray[5]).toBe(array3[1]);   
    });

});