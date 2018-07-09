// count words

function countWords(string){
    // TODO: count words in string using a standard loop (split and trim are forbidden)
    var numberOfWords=0;
    var spaceOrTab=0;
    for (var i=0;i<string.length;i++){
        if (spaceOrTab===0){
            if (string[i]!==" "){
                numberOfWords=numberOfWords+1;
                spaceOrTab=1;
            }
        }else if (spaceOrTab===1){
            if ((string[i]!==" ")&&((string[i-1]===" ")||(string[i-1]===","))){
                numberOfWords=numberOfWords+1;
            }
        }  
        
    }
    return numberOfWords;
}
console.log (countWords('hello world')===2); // => true

console.log(countWords('')===0); // => true

console.log (countWords('1,2,3,4,5')===5); // => true

console.log (countWords('   ')===0); // => true

console.log (countWords('one two    three four     five')===5); // => true