//count letters

function countWords(string){
    var words =0;
    for(var i = 0; i<string.length;i++){
        if(string[i] !=" "){
        words++;
        console.log(words);
        }
    }
}

//count words
    //Forma 1
        function isSpace(value) {
            return [" ", "	", ",", ".",";",":", "/"].indexOf(value) > -1;
        };

        function countWords(str) {
            var count = 0;
            if (str.length) {
                if (!isSpace(str[0])) { count++ };
                for (var i = 1; i < str.length; i++) {
                    var curr = str[i];
                    var prev = str[i - 1];
                    if (!isSpace(curr) && isSpace(prev)) {
                        count++;
                    }
                }
            }
            return count;
        };

        console.log(countWords(" hello world") == 2); // => true
        console.log(countWords("") == 0); // => true
        console.log(countWords("1 2 3 4 5") == 5); // => true
        console.log(countWords("    ") == 0); // => true
        console.log(countWords("one     two     three   four    five") == 5); // => true
        console.log(countWords("... //// ,,,, ") == 0); // => true

    //Forma 2
    



// split to words

function splitToWords(string) {
    // TODO implement using standard loop
    var wordSplited = string.split(" ");
        return wordSplited;
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
    word = string.split(' ');
    return word;

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