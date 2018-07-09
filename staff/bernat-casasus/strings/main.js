// count words

    function countWords(string){
        //TODO: count words in string using a standard loop (split and trim are forbidden). Remember words not characters.
        for(var i = 0; i < string.length; i++){
            var word = 0;
            if(string.charAt(i) !== (" " || "    ")){
                word++;
            }
        }
    }

    console.log(countWords('hello world') === 2); // => true
    console.log(countWords('') === 0); // => true
    console.log(countWords('1 2 3 4 5') === 5); // => true
    console.log(countWords('   ') === 0); // => true
    console.log(countWords('one    two      three  four    five') === 5); // => true




  function countWords(string){
    //TODO: count words in string using a standard loop (split and trim are forbidden). Remember words not characters.
    var count = 0;
    for (var i=0; i<string.length; i++){

}

console.log(countWords('hello world') === 2); // => true
console.log(countWords('') === 0); // => true
console.log(countWords('1 2 3 4 5') === 5); // => true
console.log(countWords('   ') === 0); // => true
console.log(countWords('one    two      three  four    five') === 5); // => true