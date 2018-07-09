// count words
console.log("count words")
    function countWords(string) {
        var chars = 0;
        for (var i = 0; i < string.length; i++){
            if( (string[i] !== " " || string[i] !== " ") && (string[(i+1)] === " ")    ){
            chars +=1;
            }
        }
        if (chars > 0){chars+=1}
        return chars;
    }
   

    console.log(countWords("hello world") === 2);
    console.log(countWords("") === 0);
    console.log(countWords("1 2 3 4 5") === 5);
    console.log(countWords("  ") === 0);
    console.log(countWords("one   two     three   four  five") === 5);

// split to words
console.log("split to words")
// TODO implement using standard loop

function splitToWords(string) {
    
    var wordsArray = [];
    var whileword = ""

    for (var i = 0; i < string.length; i++){
        
        if (string[i] !== " " && (i === (string.length-1))){
            whileword += string[i];
            wordsArray.push(whileword);
            whileword = "";
        }else if (string[i] !== " "){
                whileword += string[i]    
        } else if (string[i] === " " && whileword.length >0){
            wordsArray.push(whileword);
            whileword = "";
        }
    }
    //console.log(wordsArray)
    return wordsArray
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
console.log("find words that match expression in provided function")
function findWords(string, func) {
    // TODO: implement using a standard loop
    
    
    var wordsArray = [];
    var whileword = ""
    
    for (var i = 0; i < string.length; i++){
        if (string[i] !== " " && (i === (string.length-1))){
            whileword += string[i];
            if (func(whileword)){
            wordsArray.push(whileword);
            }
            whileword = "";
        }else if (string[i] !== " " && string[i] !== "," ){
                whileword += string[i]    
        } else if (string[i] === " " && whileword.length > 0){
            if (func(whileword)){
            wordsArray.push(whileword);
            }
            whileword = "";
        }
    }
    
    
    return wordsArray
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

