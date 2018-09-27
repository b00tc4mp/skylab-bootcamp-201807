// count words
var pass = [" ", "\t", "\n", ",", ".", ":", ";"];
function countWords(str) {
    
    var sum = 0;
    for(var i=0; i<str.length; i++) {
        var char = str[i];
        if(pass.indexOf(char) == -1) {
            sum++;
            while(pass.indexOf(char) == -1 && i < str.length) {
                i++;
                char = str[i];
            }
        } 
    }
    return sum;
    
}
console.log(countWords('  hello       world   ') === 2); // > true
console.log(countWords('    ') === 0); // > true
console.log(countWords('  1 2       3 4  5   ') === 5); // > true
console.log(countWords(' hola mundo \t \n') === 2); // > true
console.log(countWords(' ... ,,, ;;; ::::  ') === 0); // > true

// split to words
function splitToWords(str) {
    var words = []
    for(var i=0; i<str.length; i++) {
        var word = '';
        if(pass.indexOf(str[i]) == -1) {
            word += str[i];
            i++;
            while(pass.indexOf(str[i]) == -1 && i < str.length) {
                word += str[i]; 
                i++;
            }
        } 
        if(word)
            words.push(word);
    }
    return words;
}

var words = splitToWords('   hello      world,    ');
console.log(words.length === 2); // > true
console.log(words[0] === 'hello'); // > true
console.log(words[1] === 'world'); // > true

// find words that match expression in provided function

function findWords(str, func) {
    var words = splitToWords(str);
    var newWords = [];
    for(var i in words)
        if(func(words[i]))
            newWords.push(words[i]);
    return newWords;
}

var words = findWords('hello world', function(word){
    return word.indexOf('e') > -1;
});

console.log(words.length === 1); // > true
console.log(words[0] === 'hello'); // > true

var words = findWords('hello world, hello universe', function(word) {
    return word.indexOf('o') > -1;
});

console.log(words.length === 3); // > true
console.log(words[0] === 'hello'); // > true
console.log(words[1] === 'world'); // > true
console.log(words[2] === 'hello'); // > true
