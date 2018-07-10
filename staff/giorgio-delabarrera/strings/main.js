
console.log('--- countWords ---');
console.log(countWords('hello word') === 2);
console.log(countWords('') === 0);
console.log(countWords('1 2 3 4 5') === 5);
console.log(countWords(' 	') === 0);
console.log(countWords('one   two       three   four     five') === 5);

console.log('--- splitToWords ---');
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


function countWords(text) {

    var count = 0;

    var isSeparator = function(character) {
        var tabCode = 9, spaceCode = 32;
        return [tabCode, spaceCode].indexOf(character.charCodeAt()) > -1;
    }

    var isLetter = function(character) {
        return !isSeparator(character);
    }

    var hasLetter = false;

    for (var i = 0; i < text.length; i++) {
        
        var character = text[i];
        
        if (isLetter(character)) {
            if (!hasLetter) {
                hasLetter = true;
                count++;
            }
        }
        else {
            hasLetter = false;
        }   
    }

    return count;
}

function splitToWords(text) {

    var words = [];

    var isLastCharacter = function(index, text) {
        return index === text.length - 1;
    }

    var isSeparator = function(character) {
        var tabCode = 9, spaceCode = 32;
        return [tabCode, spaceCode].indexOf(character.charCodeAt()) > -1;
    }

    var hasValue = function(character) {
        return character.length && !isSeparator(character);
    }

    var word = '';
    var toAdd = false;

    for (var i = 0; i < text.length; i++) {
        
        var character = text[i];

        if (hasValue(character)) {
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

    return words
}