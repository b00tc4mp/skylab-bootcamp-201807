'use strict';

describe('Array.prototype.isArray', function () {
    var object;

    beforeEach(function () {
        object = 'stats';
    });

    it('should check if an object is an array', function() {
        var result = Array.isArray(object);

        expect(result).toBeFalsy();
    });
});

describe('Array.prototype.isArray', function () {
    var object;

    beforeEach(function () {
        object = [];
    });

    it('should check if an array is an array', function() {
        var result = Array.isArray(object);

        expect(result).toBeTruthy();
    });
});