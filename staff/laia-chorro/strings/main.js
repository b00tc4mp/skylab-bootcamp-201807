
function isAlphaNumeric(string) {
    var regexAlphaNumeric = /[A-Za-z0-9à-úçñ'·ý]/; // Any alphanumeric symbol including accents

    return string && string.match(regexAlphaNumeric);
}

// count words
function countWords(string) {
    // TODO: count words in string using a standard loop
    var words = 0;

    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1],
            isFirstWord = i === 0 && isAlphaNumeric(letter);

        if (isFirstWord || !isAlphaNumeric(letter) && isAlphaNumeric(nextLetter)) {
            words++;
        }        
    }

    return words;
}

console.log(countWords('hello world') === 2); // => true
console.log(countWords('') === 0); // => true
console.log(countWords('1 2 3 4 5') === 5); // => true
console.log(countWords('one two  three          four     five  ') === 5); // => true

// split to words

function splitToWords(string) {
    // TODO implement using standard loop
    var word = '',
        words = [];

    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1];

        if (isAlphaNumeric(letter) ) {
            word += letter;

            if (!nextLetter || !isAlphaNumeric(nextLetter) ) {
                words.push(word);
                word = '';
            }
        }
    }

    return words;
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

var words = findWords('hello world', function(word) { 
    return word.indexOf('e') > -1;
});

console.log(words.length === 1); // => true
console.log(words[0] === 'hello'); // => true

var words = findWords('hello world, hello universe', function(word) { 
    return word.indexOf('o') > -1; 
});

console.log(words.length === 3); // => true
console.log(words[0] === 'hello'); // => true
console.log(words[1] === 'world'); // => true
console.log(words[2] === 'hello'); // => true


