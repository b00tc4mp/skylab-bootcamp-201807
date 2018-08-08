

// count words by Juan 
// var pas = [" ", "\t", "\n", ".", ",", ":", ";"];

// function countWords(string) {
//         // TODO: count words in string using a standard loop (split and trim are forbidden), taking into account spaces and tabs
//         var words = 0;
//         for (var i = 0; i < string.length; i++) {
//                 var char = string[i];
//                 if (pas.indexOf(char) == -1) {
//                         words += 1;
//                         while (pas.indexOf(char) == -1 && i < string.length) {
//                                 i++;
//                                 char = string[i];
//                         }
//                 }
//         }
//         return words;
// }

// ______________________________________________________
// is blank

// rudimentary, but it works
// function isBlank(string) {
//     for (var i = 0; i < string.length; i++) {
//         var char = string[i];

//         if (char !== ' ' && char !== '\t' && char !== '\n') return false;
//     }

//     return true;
// }









// split to words

function splitToWords(string) {
        // TODO implement using standard loop

        var pas = [" ", "\t", "\n", ".", ",", ":", ";"];

        var words = 0;
        for (var i = 0; i < string.length; i++) {
                var char = string[i];
                if (pas.indexOf(char) == -1) {
                        words += 1;
                        while (pas.indexOf(char) == -1 && i < string.length) {
                                i++;
                                char = string[i];
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