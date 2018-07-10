var words = splitToWords('hello world');
console.log(words.length === 2); // true
console.log(words[0] === 'hello'); // true
console.log(words[1] === 'world'); // true

var words = splitToWords('a b c');
console.log(words.length === 3); // true
console.log(words[0] === 'a'); // true
console.log(words[1] === 'b'); // true
console.log(words[2] === 'c'); // true

var words = splitToWords(' \t\n');
console.log(words.length === 0); // true

var words = splitToWords(' @ # $ % & | ! ª º ');
console.log(words.length === 0); // true

var words = splitToWords('h@llo');
console.log(words.length === 2); // true