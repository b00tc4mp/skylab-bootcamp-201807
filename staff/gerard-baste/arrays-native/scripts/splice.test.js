'use strict';

describe('Array.prototype.splice', function () {
    var elements;
    
    beforeEach(function () {
        elements = ['Jan', 'March', 'April', 'June'];
    });

    it('should iterate and operate correctly', function() {
            
        elements.splice(1,0,'February');

        expect(elements.length).toBe(5);
        expect(elements[0]).toEqual('Jan', 'Feb', 'March', 'April', 'June');

    });
});