// count words

function _split(string, separator) {
    var arr = [];
    var word = "";

    for (var i = 0; i < string.length; i++) {
        if (string[i].charCodeAt(0) !== separator.charCodeAt()) {
            word += string[i];
        }
        else {
            if (word !== "") arr.push(word);

            word = "";
        }

        if (i === string.length - 1 && word !== "") arr.push(word);
    }

    return arr;
}

function countWords(string) {
    var arr = [];
    var word = '';

    if (!string.length) return 0;

    return _split(string, " ").length;
}

console.log(countWords('hello world') === 2); // => true
console.log(countWords('') === 0); // => true
console.log(countWords('1 2 3 4 5') === 5); // => true
console.log(countWords('    ') === 0); // => true
console.log(countWords('one   two       three   four     five') === 5); // => true


// split to words

function splitToWords(string) {
    var arr = [];
    var word = '';

    if (!string.length) return 0;

    return _split(string, " ");
}

var words = splitToWords('hello world');

console.log(words.length === 2); // => true
console.log(words[0] === 'hello'); // => true
console.log(words[1] === 'world'); // => true

var words = splitToWords('a b c');

console.log(words.length === 3); // => true
console.log(words[0] === 'a'); // => true
console.log(words[1] === 'b'); // => true
console.log(words[2] === 'c'); // => true

var words = splitToWords('      ');

console.log(words.length === 0); // => true


// // find words (that match expression in provided function)

function findWords(string, func) {
    var words = _split(string, " ");
    var arr = [];
    for (var i = 0; i < words.length; i++) {
        if (func(words[i])) arr.push(words[i].replace(/,/g, ""));
    }

    return arr;
}

var words = findWords('hello world', function (word) {
    return word.indexOf('e') > -1;
});

console.log(words.length === 1); // => true
console.log(words[0] === 'hello'); // => true

var words = findWords('hello world, hello universe', function (word) {
    return word.indexOf('o') > -1;
});

console.log(words.length === 3); // => true
console.log(words[0] === 'hello'); // => true
console.log(words[1] === 'world'); // => true
console.log(words[2] === 'hello'); // => true