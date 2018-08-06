//Mi versión
/*
var symbols = [",",";",".",":","\t"," ","\n"];
function splitToWords(string) {
    var words = [];
    for(var i =0; i < string.length;i++){
        var char = string[i];
        if(symbols.indexOf(char) === -1){
            var word = "";
            while(symbols.indexOf(char) === -1 && i < string.length){
                word+=char;
                i++;
                char = string[i];
            }
            words.push(word);
        }
    }
    return words;
}*/

// split to words

function splitToWords(string) {
    var words = [];
    var currentWord = '';

    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        if (!isBlank(char) && !hasSymbol(char)) {
            currentWord = currentWord.concat(char);
        }
        else if (currentWord.length) {
            words.push(currentWord);
            currentWord = '';
        }
        
    }
    if (currentWord.length) words.push(currentWord);
    return words;

}