function A() { 
	this.name = 'A'; 

	var surname = 'S';

	this.hello = function() { console.log('hello, i am ' + this.name  + ' ' + surname); }
}

A.prototype.hello = function() { console.log('hello, i am an instance of ' + this.name); }

var a = new A()

a
// A {name: "A", hello: ƒ}
a.hello()
// VM22918:6 hello, i am A S
// undefined
b = new A()
// A {name: "A", hello: ƒ}
a.hello === b.hello
// false
a.__proto__.hello === b.__proto__.hello
// true
delete a.hello
// true
a.hello()
// VM22918:9 hello, i am an instance of A
// undefined
delete a.hello
// true
a.hello()
// VM22918:9 hello, i am an instance of A
// undefined
delete a.__proto__.hello
// true
a.hello()
// VM23313:1 Uncaught TypeError: a.hello is not a function
//     at <anonymous>:1:3
// (anonymous) @ VM23313:1