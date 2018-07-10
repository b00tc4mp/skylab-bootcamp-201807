// is blank

// rudimentary, but it works
// function isBlank(string) {
//     for (var i = 0; i < string.length; i++) {
//         var char = string[i];

//         if (char !== ' ' && char !== '\t' && char !== '\n') return false;
//     }

//     return true;
// }

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

// has symbol

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

// count words

function countWords(string) {
    var count = 0;
    var blankBefore = true;

    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        if (!isBlank(char)) {
            if (blankBefore && !hasSymbol(char)) {
                count++;

                blankBefore = false;
            }
        } else blankBefore = true;
    }

    return count;
}

console.log(countWords('hello world') === 2); // true
console.log(countWords('') === 0); // true
console.log(countWords('1 2 3 4 5') === 5); // true
console.log(countWords('    ') === 0); // true
console.log(countWords('one   two       three   four     five') === 5); // true
console.log(countWords('hola mundo \t\n') === 2); // true
console.log(countWords('... ,,, ;;; :::') === 0); // true

// split to words

function splitToWords(string) {
    // TODO implement using standard loop
}

var words = splitToWords('hello world');

console.log(words.length === 2); // true
console.log(words[0] === 'hello'); // true
console.log(words[1] === 'world'); // true

var words = splitToWords('a b c');

console.log(words.length === 3); // true
console.log(words[0] === 'a'); // true
console.log(words[1] === 'b'); // true
console.log(words[2] === 'c'); // true

var words = splitToWords('      ');

console.log(words.length === 0); // true


// find words (that match expression in provided function)

function findWords(string, func) {
    // TODO: implement using a standard loop
}

var words = findWords('hello world', function (word) {
    return word.indexOf('e') > -1;
});

console.log(words.length === 1); // true
console.log(words[0] === 'hello'); // true

var words = findWords('hello world, hello universe', function (word) {
    return word.indexOf('o') > -1;
});

console.log(words.length === 3); // true
console.log(words[0] === 'hello'); // true
console.log(words[1] === 'world'); // true
console.log(words[2] === 'hello'); // true