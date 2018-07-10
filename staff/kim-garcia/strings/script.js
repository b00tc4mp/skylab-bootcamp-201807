

// CORRECCION CON REGRETS

 console.log(countWords("hello world")=== 2) // ==> true
 console.log(countWords(" ")=== 0) // ==> true
 console.log(countWords(" 1 2 3 4 5")=== 5) // ==> true
 console.log(countWords("    ")=== 0) // ==> true
 console.log(countWords("one two     three    for five")=== 5) // ==> true
 console.log(countWords("hello world  /t /n") ===2)
 console.log(countWords("::: ;;; ...") === 0)


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

 //split
 function splitToWords(string){
     //todo implement standars loop

 }
var words = splitToWords("hello world")
//console.log(words.length ===2) //true
console.log(words[0] === "hello") //true
console.log(words[1] === "world")
 










 //find words (that match expression in provided function)

 function findWords(string, func){
     //TODO: implement a standard loop
 }



 //ejemplo
 var words = findWords("hello world", function(word){
    return word.indexOf("e") > -1;
 }) 

console.log(word.length ===1); // true
console.log(words[0] === "hello"); // true


var words = findWords("hello world, hello universe", function(word){
    return word.indexOf("o") > -1;
})

console.log(words.length === 3)

