function smash() {
	console.log('before');

	throw new Error('hulk smash');

	console.log('after');
}

smash();
// VM10276:2 before
// VM10276:4 Uncaught Error: hulk smash
//     at smash (<anonymous>:4:8)
//     at <anonymous>:9:1

// ...

function add(a, b) { 
	if (typeof a !== 'number') throw new Error(a + ' is not a valid number');
	if (typeof b !== 'number') throw new Error(b + ' is not a valid number');

	return a + b; 
}

console.log(add(1, 2));

console.log(add(true, 'f'));

// VM10852:8 3
// VM10852:2 Uncaught Error: true is not a valid number
//     at add (<anonymous>:2:35)
//     at <anonymous>:12:13
