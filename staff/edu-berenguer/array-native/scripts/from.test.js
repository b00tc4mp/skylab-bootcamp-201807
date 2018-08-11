describe('Array.prototype.from', function () {
    var array;
    var result;
    
    beforeEach(function () {
        array= ["a","b","c"];
    });

    it('should iterate and operate correctly', function() {
            
        result = Array.from(array);
        
        expect(result.length).toBe(3); 
        expect(result[0]).toBe("a"); 
        expect(result[1]).toBe("b"); 
        expect(result[2]).toBe("c"); 

    });
});
