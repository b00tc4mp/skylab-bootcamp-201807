var a = ['Viento', 'Lluvia', 'Fuego'];
var miVar1 = a.join();      // asigna 'Viento,Lluvia,Fuego' a miVar1
var miVar2 = a.join(', ');  // asigna 'Viento, Lluvia, Fuego' a miVar2
var miVar3 = a.join(' + '); // asigna 'Viento + Lluvia + Fuego' a miVar3
var miVar4 = a.join('');    // asigna 'VientoLluviaFuego' a miVar4


'use strict';

describe('Array.prototype.join', function () {
    var array;

    beforeEach(function () {
        array = ["Paz", "Amor", "Empatia"];
    });

    it('should join all the elements of the array and return a string', function() {

        var joined = array.join(", ");

        expect(array.length).toBe(3);

        expect(joined).toBe("Paz, Amor, Empatia");
    });
});