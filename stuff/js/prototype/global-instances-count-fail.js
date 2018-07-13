function A() {
	this.count++;
}

A.prototype.count = 0;

var a = new A();
var b = new A();

a.count
// 1
b.count
// 1
a
// A {count: 1}count: 1__proto__: Objectcount: 0constructor: ƒ A()__proto__: Object
b
// A {count: 1}

// this.count++ => this.count = this.count + 1;