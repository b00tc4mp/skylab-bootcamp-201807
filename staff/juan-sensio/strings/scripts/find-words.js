/*
function findWords(string, func) {
    return splitToWords(string).filter(func);
}
*/

function findWords(string, func) {
    var words = splitToWords(string);
    var matchingWords = [];
    for(var i=0; i<words.length; i++) {
        var word = words[i];
        if(func(word)) matchingWords.push(word);
    }
    return matchingWords;
}