
function isBlank(string) {
    return /^\s*$/.test(string);
}

console.log(isBlank('a') === false); // true
console.log(isBlank('abc') === false); // true
console.log(isBlank(' ')); // true
console.log(isBlank('\t')); // true
console.log(isBlank('\n')); // true
console.log(isBlank('')); // true
console.log(isBlank(' \t\n')); // true
console.log(isBlank(' \t\n &%$@') === false); // true


function hasSymbol(string) {
    return /[^\w\sà-úÀ-Úä-üÄ-Üâ-ûñç]/.test(string);
}

console.log(hasSymbol('a') === false); // true
console.log(hasSymbol('ABC') === false); // true
console.log(hasSymbol('abc') === false); // true
console.log(hasSymbol('ñç') === false); // true
console.log(hasSymbol('') === false); // true
console.log(hasSymbol('.')); // true
console.log(hasSymbol(':')); // true
console.log(hasSymbol(';')); // true
console.log(hasSymbol('...')); // true
console.log(hasSymbol('abc;')); // true
console.log(hasSymbol(' ') === false); // true
console.log(hasSymbol('\t') === false); // true
console.log(hasSymbol('\n') === false); // true
console.log(hasSymbol(' \t\n') === false); // true
console.log(hasSymbol('#')); // true
console.log(hasSymbol('%')); // true
console.log(hasSymbol('$')); // true
console.log(hasSymbol('=')); // true
console.log(hasSymbol('123') === false); // true
console.log(hasSymbol('áéíóúàèìòùäëïöüâêîôûÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛñÑçÇ \t\n') === false); // true


function countWords(text) {
    var count = 0;
    var blankBefore = true;

    for (var i = 0; i < text.length; i++) {
        var char = text[i];

        if (!isBlank(char)) {
            if (blankBefore && !hasSymbol(char)) {
                count++;

                blankBefore = false;
            }
        } else blankBefore = true;
    }

    return count;
}

console.log(countWords('hello word') === 2);
console.log(countWords('') === 0);
console.log(countWords('1 2 3 4 5') === 5);
console.log(countWords(' 	') === 0);
console.log(countWords('one   two       three   four     five') === 5);
console.log(countWords('hola mundo \t\n') === 2);
console.log(countWords('... ,,, ;;; :::') === 0);

var isLastCharacter = function(index, text) {
    return index === text.length - 1;
}

function splitToWords(text) {

    var words = [];
    var word = '';
    var toAdd = false;

    for (var i = 0; i < text.length; i++) {
    
        var char = text[i];
        if (!isBlank(char) && !hasSymbol(char)) {
            toAdd = true;
            word = word.concat(char);
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