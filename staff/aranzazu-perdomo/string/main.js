function countWords(string){
    var res=0;
    for(var i=0; i<=string.length; i++){

        res= string[i];
   }

}

console.log(countWords('hello world')===2);
console.log(countWords('')===0);
console.log(countWords('1 2 3 4 5')===0);
console.log(countWords('   '===0));
console.log(countWords('one two three four five')===5);