// test 1

var chars = [2, 1, 3];

var sorted = sort(chars);

console.log(sorted.length === 3);
console.log(sorted[0] === 1);
console.log(sorted[1] === 2);
console.log(sorted[2] === 3);

// test 2

var chars = [2, 1, 3];

var sorted = sort(chars, true);

console.log(sorted.length === 3);
console.log(sorted[0] === 3);
console.log(sorted[1] === 2);
console.log(sorted[2] === 1);

// test 3

var chars = ['b', 'c', 'a'];

var sorted = sort(chars);

console.log(sorted.length === 3);
console.log(sorted[0] === 'a');
console.log(sorted[1] === 'b');
console.log(sorted[2] === 'c');

// test 4

var words = ['hello', 'world', 'and', 'universe'];

var sorted = sort(words, true);

console.log(sorted.length === 4);
console.log(sorted[0] === 'world');
console.log(sorted[1] === 'universe');
console.log(sorted[2] === 'hello');
console.log(sorted[3] === 'and');