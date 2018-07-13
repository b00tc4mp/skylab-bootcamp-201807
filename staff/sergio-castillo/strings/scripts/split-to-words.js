function splitToWords(string) {
    // TODO implement using standard loop
    // var numberOfWords = countWords(string);
    var currentWord="";
    var words=[];
    for (var i=0;i<string.length;i++){
        var char=string[i];
        if(!isBlank(char)&&!hasSymbol(char)){
            currentWord=currentWord.concat(char);
        }else if(currentWord.length){
                words.push(currentWord);
                currentWord="";
        }
    }
    if (currentWord.length){ // No hace falta poner el >=1 pq directamente si es 0 da false
        words.push(currentWord);
    }    
    return words;
}
