'use strict';

describe('logic', function () {
    
    describe('find', function() {
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

    describe('getById', function() {
        var result;

        beforeEach(function() {
            result = logic.getById('30075445');
        })

        it('should results defined', function() {
            expect(result).toBeDefined();
        });

        it('should results id 30075445', function() {
            expect(result.restaurant_id).toBe('30075445');
        });

        it('should results name Morris Park Bake Shop', function() {
            expect(result.name).toBe('Morris Park Bake Shop');
        });

    });
});