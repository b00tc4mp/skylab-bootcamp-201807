// math

/**
 * Adds two given numbers
 * 
 * @example
 * var res = add(1, 2);
 * console.log(res); // 3
 * 
 * @param {number} a First operand 
 * @param {number} b Second operand
 * 
 * @returns {number} The result of add first and second operands
 * 
 * @throws {Error} If any of the operands is not a valid number
 */
function add(a, b) { 
	if (typeof a !== 'number' || isNaN(a)) throw new Error(a + ' is not a valid number');
	if (typeof b !== 'number' || isNaN(b)) throw new Error(b + ' is not a valid number');

	return a + b; 
}

console.log(add(1, 2) === 3); // true
console.log(add(1.2, 3.4) === 4.6); // true

(function() {
    var message;

    try {
        add(1, 'x');
    } catch(err) {
        message = err.message;
    }
    
    console.log(message === 'x is not a valid number'); // true
})();

(function() {
    var message;

    try {
        add('x', 1);
    } catch(err) {
        message = err.message;
    }

    console.log(message === 'x is not a valid number'); // true
})();

(function() {
    var message;

    try {
        add('x', 'y');
    } catch(err) {
        message = err.message;
    }

    console.log(message === 'x is not a valid number'); // true
})();

(function() {
    var message;

    try {
        add(true, false);
    } catch(err) {
        message = err.message;
    }

    console.log(message === 'true is not a valid number'); // true
})();

// use math in my code

// var a = prompt('enter operand a');
// var b = prompt('enter operand b');

// try {
//     alert(add(parseFloat(a), parseFloat(b)));
// } catch(err) {
//     alert('hey, i can\'t add ' + a + ' + ' + b);
// }

