
//count words
function countWords(string){
    var words=0;
    if(string[0]!==' ') { words++} 
    for (var i=1; i<string.length; i++){
        if (string[i]===' '){
            if (string[i+1]!==' '){
                words++;
            }
        }
    }
    return words;
}

//solucio
function isBlank(char){
    return char=== ' ' || char === '\t';
}
function countWords(string){
    var blankBefore=true;
    var count=0;
    for (var i=0; i<string.length; i++){
        var char=string[i];
        if (!isBlank(char)){
            if(blankBefore){
                count++;
                blankBefore= false;
            }
        }else blankBefore = true;

    }

}



console.log(countWords('hello world')===2); //true
console.log(countWords('')===0); //true 
console.log(countWords('1 2 3 4 5')===5);//true
console.log(countWords('    ')===0); //true
console.log(countWords('one     two         three   four        five')===5); //true




//split to words
function splitToWords(string){
    var word=-1;
    var words=" ";
    
    for(var i=0; i<string.lenght; i++){
        if (string[i]===' '){
            word++;
            for(var j=0; j<i; j++){
                words[word]= string[j];
            }
        } 
    }
    return word+1;

}
var words= splitToWords('hello world');
console.log(words.lenght===2);//true
console.log(words[0]==='hello');
console.log(words[1]==='world');






//find words
function findWords(string, func){

}
var words=findWords('hello world', function(word){
    return word.indexOf('e')>-1;
});

console.log(words.length===1);
console.log(words===0);