function A() { 
	this.name = 'A';
}

A.prototype.hello = function() { console.log('hello, i am an instance of ' + this.name); }
A.prototype.type = 'i am type A';

var a = new A()

a
// A {name: "A"}
a.type
// "i am type A"
a.type = 'i am type B'
// "i am type B"
a
// A {name: "A", type: "i am type B"}
a.__proto__.type
// "i am type A"
delete a.type
// true
a.type
// "i am type A"