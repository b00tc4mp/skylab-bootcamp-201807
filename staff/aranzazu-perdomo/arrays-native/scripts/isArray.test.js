'use strict';

describe('Array.prototype.from', function () {
    var obejct;

    beforeEach(function () {
       obejct="stats";
    });

    it('should check if an object is an array', function() {
        var result =Array.isArray(obejct);


        

        expect(result).toBe(false);
        
       
    });
});