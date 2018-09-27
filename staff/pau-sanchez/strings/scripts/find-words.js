
/*
function findWords(string, func) {
    // TODO: implement using a standard loop
    
    
    var wordsArray = [];
    var whileword = ""
    
    for (var i = 0; i < string.length; i++){
        var char = string[i];

        if (reg(char) && (i === (string.length-1))){
            whileword += string[i];
            if (func(whileword)){
            wordsArray.push(whileword);
            }
            whileword = "";
        }else if (reg(char) && string[i] !== "," ){
                whileword += string[i]    
        } else if (!reg(char) && whileword.length > 0){
            if (func(whileword)){
            wordsArray.push(whileword);
            }
            whileword = "";
        }
    }
    
    
    return wordsArray
}
*/

function findWords(string, func){
    var words = splitToWords(string);
    var matchingWords = [];

    for (var i = 0; i < words.length; i++){
        var word = words[i];

        if (func(word)) matchingWords.push(word)
    }
    return matchingWords;
}