function Fun() {}
// undefined
var f = new Fun()
// undefined
f.constructor
// ƒ Fun() {}
var g = Object.create(f)
// undefined
g
// Fun {}
f.constructor = Array
// ƒ Array() { [native code] }
var g = Object.create(f)
// undefined
g
// Array {}

// but in fact, g is NOT an Array!

g.forEach()
// VM29154:1 Uncaught TypeError: g.forEach is not a function
//     at <anonymous>:1:3