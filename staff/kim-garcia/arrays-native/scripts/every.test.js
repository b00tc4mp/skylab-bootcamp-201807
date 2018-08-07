

  'use strict';

describe("Array.prototype.every", function (){
    
    var array;

    beforeEach(function() {

        array = [1, 2, 3, 4, 5];


    })

    it ("Return true if all the elements pass the condition", function(){

        function menoresDiez(a){
            return a < 10;
        }

        var result = array.every(menoresDiez);

       
        expect(result).toBeTruthy();

    })
})

