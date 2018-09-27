function A() {
	this.__proto__.count++;
}

A.prototype.count = 0;

var a = new A();
var b = new A();

a.count
// 2
b.count
// 2

// this.__proto__.count++; => this.__proto__.count = this.__proto__.count + 1;

var c = new A();
// undefined
c.count
// 3
a.count
// 3
b.count
// 3