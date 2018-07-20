var a = [1, 2, 3, 4, 5];

var [b, c] = a;

console.log(b, c)

//

var o = { name: 'n', surname: 's' }

var {name} = o

console.log(name)

//

var o = { a: { b: { c: { d: [1, 2, 3] } } } };

var { a: { b: { c: { d: [one, two] } } } } = o; 

//

var o = { a: { b: { c: { d: [1, 2, 3] } } } };

var { a: { b: { c: { d: [, two] } } } } = o; 

//

var o = { name: 'John' }

var { name: n } = o