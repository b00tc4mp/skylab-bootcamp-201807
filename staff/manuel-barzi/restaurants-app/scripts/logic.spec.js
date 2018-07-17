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
        
        it('should each result name have word "cream"', function() {
            for (var i = 0; i < results.length; i++)
            expect(results[i].name.toLowerCase()).toContain('cream');
        });
    });

    describe('retrieveById', function() {
        var result;

        beforeEach(function() {
            result = logic.retrieveById('30075445');
        });

        it('should retrieve the restaurant that matches the id "30075445"', function() {
            expect(result.restaurant_id).toBe('30075445');
            expect(result.name).toBe('Morris Park Bake Shop');
            expect(result.cuisine).toBe('Bakery');
            expect(result.address).toBeDefined();
            expect(result.address.zipcode).toBe('10462');
            expect(result.address.building).toBe('1007');
        });
    });
});