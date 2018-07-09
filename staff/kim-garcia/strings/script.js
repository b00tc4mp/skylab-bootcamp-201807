//count words
 function countWords(string){
     //TODO: count words in string using a standar loop (split and trim are forbiden). remember words not characters

 }

 console.log(countWords("hello world")=== 2) // ==> true
 console.log(countWords(" ")=== 0) // ==> true
 console.log(countWords(" 1 2 3 4 5")=== 5) // ==> true
 console.log(countWords("    ")=== 0) // ==> true
 console.log(countWords("one two     thre    for five")=== 5) // ==> true

 //split
 function splitToWords(string){
     //todo implement standars loop
 }
var words = splitToWords("hello world")
console.log(words.lenght ===2) //true
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
