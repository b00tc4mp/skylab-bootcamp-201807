// test 1

var numbers = [1, 2, 3];
var strings = [];

forEach(numbers, function(number) {
  strings.push(number.toString());
});


console.log(strings.length === 3);
console.log(strings[0] === '1');
console.log(strings[1] === '2');
console.log(strings[2] === '3');

// test 2

var plus2 = [];

forEach(numbers, function(number) {
  plus2.push(number + 2);
});

console.log(plus2.length === 3);
console.log(plus2[0] === 3);
console.log(plus2[1] === 4);
console.log(plus2[2] === 5);

// test 3

var words = ['hello', 'my', 'world', '!'];
var lengths = [];

forEach(words, function(word) {
  lengths.push(word.length);
});

console.log(lengths.length === 4);
console.log(lengths[0] === 5);
console.log(lengths[1] === 2);
console.log(lengths[2] === 5);
console.log(lengths[3] === 1);