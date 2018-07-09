//count words

function countWords(string){
    //TO DO: count words in string using a standard loop (split and trim are forbidden), taking into account spaces and tabs
    function space(value) {
        return [" ","   "].indexOf(value) > -1;
    };
        var result = 0;
        if (string.length) {
            if (!space(string[0])) { 
                result++ 
            };
            for (var i = 1; i < string.length; i++) {
                var currentChar = string[i];
                var previousChar = string[i - 1];
                if (!space(currentChar) && space(previousChar)) {
                    result++;
                }
            }
        }
        return result;
    };

console.log(countWords("hello world") === 2); // => true

console.log(countWords(" hello world") === 2); // => true

console.log(countWords("hello world ") === 2); // => true

console.log(countWords(" ") === 0); // => true

console.log(countWords("    ") === 0); // => true

console.log(countWords("1 2 3 4 5") === 5); // => true

console.log(countWords("one two     three    four       five") === 5); // => true





// split to words

function splitToWords(string) {
    // TODO implement using standard loop
    var str = "How are you doing today?";
    var res = str.split(" ");
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