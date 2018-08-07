
// expected output: 12

'use strict';

describe('Array.prototype.find', function () {
    var array;

    beforeEach(function () {
        array = [1, 2, 3, 4, 5];
    });

    it('should return the first value that pass the condition ', function() {
        var found = array.find(function(element){
           return element > 2
        });

        expect(found).toBe(3);

    });
});
