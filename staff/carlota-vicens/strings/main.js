
//count words
function countWords(string){
    var words=0;
    for (var i=0; i<string.length; i++){
        if (string[i]==' '){
            words++;
        } 
    }
    return words;
}
console.log(countWords('hello world')===2); //true
console.log(countWords(' ')===0); //true
console.log(countWords('1 2 3 4 5')===5);//true
console.log(countWords('    ')===0); //true
console.log(countWords('one     two         three   four        five')===5); //true

