function _toCamelCase(string) {
    var words = splitToWords(string);
    var wordsCamelCase = '';
    for(var i in words) {
        var word = words[i];
        var newWord;
        if(i == 0) newWord = word[0].toLowerCase();
        else       newWord = word[0].toUpperCase();
        for(var j=1; j<word.length; j++) {
            newWord += word[j].toLowerCase();
        }
        wordsCamelCase += newWord;
    }
    return wordsCamelCase;
}

function toCamelCase(string) {
    var words = splitToWords(string);
    var wordsCamelCase = '';
    for(var i in words) {
        var word = words[i];
        wordsCamelCase += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    if(wordsCamelCase)
        wordsCamelCase = wordsCamelCase[0].toLowerCase() + wordsCamelCase.slice(1); 
    return wordsCamelCase;
}