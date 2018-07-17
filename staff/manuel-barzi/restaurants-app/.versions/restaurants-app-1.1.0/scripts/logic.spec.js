'use strict';

describe('logic', function () {
    var results;

    beforeEach(function() {
        results = logic.find('cream');
    })

    it('should results length be 104', function() {
        expect(results.length).toBe(104);
    });
    
    it('should each result name have word cream', function() {
        for (var i = 0; i < results.length; i++)
            expect(results[i].name.toLowerCase()).toContain('cream');
    });
});