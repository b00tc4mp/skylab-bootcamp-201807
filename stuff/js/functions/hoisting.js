var a = 1;

function fun() {
	console.log(a);
	console.log(foo());

	var a = 2;

	function foo() {
		return 'i am foo';
    }
}

fun();
// undefined
// i am foo

// ...

var a = 1;

function fun() {
	console.log(a);
	console.log(foo());

	var a = 2;

	var foo = function() {
		return 'i am foo';
    }
}

fun();
// undefined
// VM6097:5 Uncaught TypeError: foo is not a function
//     at fun (<anonymous>:5:14)
//     at <anonymous>:14:1