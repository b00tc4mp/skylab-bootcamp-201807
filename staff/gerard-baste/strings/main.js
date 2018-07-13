// count words

function countWords(string) {

    var st = '';
    var array = [];
    var spaces = array.indexOf("");
    var tabs = array.indexOf("	");


    for (var i = 0; i < string.length; i++) {
        if (i === string.length - 1) {
            st += string[i];
            array.push(st);
        } else if (string[i] === ' ') {
            array.push(st);
            st = '';
        } else if (string[i] === '') {
            array.push(st);
            st = '';

        } else if (string[i] !== ' ') {
            st += string[i];
        }
    }

    if (array.indexOf('	') !== -1 || array.indexOf(' ') !== -1) {
        console.log(array.length);
        array = [];
    }
    console.log(array);
    return array.length;
}

console.log(countWords('hello word') === 2);
console.log(countWords('') === 0);
console.log(countWords('1 2 3 4 5') === 5);
console.log(countWords(' 	') === 0);
console.log(countWords('one   two       three   four     five') === 5);

// next

// split to words
function splitToWords(string) {
    var space = " ",
        word = "",
        wordsArr = [];
    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1];
        if (letter !== space) {
            word += letter;
            if (!nextLetter || nextLetter === space) {
               // debugger;
                wordsArr.push(word);
                word = "";
            }
        } 
    }
    return wordsArr;
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
var words = splitToWords(' hello world');
console.log(words[0] === 'hello'); // => true
var words = splitToWords('hello world ');
console.log(words[0] === 'hello'); // => true


// find words (that match expression in provided function)

// find words (that match expression in provided function)

function findWords(string, func) {
    // TODO: implement using a standard loop
    var words = splitToWords(string),
        matchedWords = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (func(word)) {
            matchedWords.push(word);
        }
    }

    return matchedWords;
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












/*
function countWords(string) {

    var st = ''
    var array = []
    var spaces = ["", "	"]


    for (var i = 0; i < string.length; i++) {
        if (i === string.length - 1) {
            st += string[i]
            array.push(st)
        } else if (string[i] === ' ') {
            array.push(st)
            st = ''
        } else if (string[i] !== ' ') {
            st += string[i]

        }
    }

    if (array.indexOf(spaces) !== -1) {
        console.log('entra')
    }
    console.log(array)
    return array.length
}

console.log(countWords('hello word') === 2)
console.log(countWords('') === 0)
console.log(countWords('1 2 3 4 5') === 5)
console.log(countWords(' 	') === 0);
console.log(countWords('one   two       three   four     five') === 5);
*/