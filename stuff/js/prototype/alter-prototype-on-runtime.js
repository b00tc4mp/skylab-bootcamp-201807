function A() {}

var a = new A();
var b = new A();
var c = new A();

a
// A {}
b
// A {}
c
// A {}

A.prototype.hello = function() { console.log('hello') };

a.hello()
// VM24505:1 hello
// undefined
b.hello();
// VM24505:1 hello
// undefined
c.hello();
// VM24505:1 hello
// undefined