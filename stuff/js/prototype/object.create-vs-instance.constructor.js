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