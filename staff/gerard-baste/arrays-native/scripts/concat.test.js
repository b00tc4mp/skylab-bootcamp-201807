'use strict'

// declaramos las variables a comprobar
describe('Array.prototype.concat', function () {
    var array1
    var array2
    var result;


// Inicializamos las variables
    beforeEach(function () {
        array1 = ['a','b','c']
        array2 = ['d','e','f']
    });

// Las iteramos 
    it('should iterate and operate correctly', function() {
        result = array1.concat(array2);

        expect(result[0]).toEqual('a','b','c','d','e','f');
        expect(result.length).toBe(6);
         expect(result[0]).toBe('a');
         
        // expect(array[1]).toBe(2);
        // expect(array[2]).toBe(3);
        // expect(array[3]).toBe(4);
        // expect(array[4]).toBe(5);
    });
    });