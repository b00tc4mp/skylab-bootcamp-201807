
console.log('\n--- countWords ---');

console.log(countWords('hello word') === 2);
console.log(countWords('') === 0);
console.log(countWords('1 2 3 4 5') === 5);
console.log(countWords(' 	') === 0);
console.log(countWords('one   two       three   four     five') === 5);
console.log(countWords('hola mundo \t\n') === 2);
console.log(countWords('... ,,, ;;; :::') === 0);


console.log('\n--- splitToWords ---');

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


console.log('\n--- findWords ---');

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



function countWords(text) {

    var count = 0;

    var isLetterOrDigit = function(character) {
        var re = /[\da-zA-Z]/;
        return re.test(character);
    }

    var hasLetterOrDigit = false;

    for (var i = 0; i < text.length; i++) {
        
        var character = text[i];
        
        if (isLetterOrDigit(character)) {
            if (!hasLetterOrDigit) {
                hasLetterOrDigit = true;
                count++;
            }
        }
        else {
            hasLetterOrDigit = false;
        }   
    }

    return count;
}

function splitToWords(text) {

    var words = [];

    var isLastCharacter = function(index, text) {
        return index === text.length - 1;
    }

    var isLetterOrDigit = function(character) {
        var re = /[\da-zA-Z]/;
        return re.test(character);
    }

    var word = '';
    var toAdd = false;

    for (var i = 0; i < text.length; i++) {
        
        var character = text[i];

        if (isLetterOrDigit(character)) {
            toAdd = true;
            word = word.concat(character);
            if (isLastCharacter(i, text)) {
                words.push(word);
            }
        }
        else {
            if (toAdd) {
                toAdd = false;
                words.push(word);
                word = '';
            }
        }   
    }

    return words;
}

function findWords(string, func) {
    
    var foundWords = [];
    
    var words = splitToWords(string);

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (func(word)) {
            foundWords.push(word);
        }
    }
    
    return foundWords;
}