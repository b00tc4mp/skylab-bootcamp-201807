'use strict';

describe('Array.filter', function () {
    var array1;

    beforeEach(function () {
        array1 = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    });

    it('should generatea new array with the values that acomplish the condition', function() {

        expect(array1).toEqual(['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']);

        expect(array1.filter(word => word.length > 6)).toEqual(["exuberant", "destruction", "present"]);
    });
});