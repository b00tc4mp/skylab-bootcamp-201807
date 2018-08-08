// find words (that match expression in provided function)
function findWords(string, func) {
    // TODO: implement using a standard loop
    words = splitToWords(string);

    var matchingWord = [];

    for(var i = 0; i < words.length; i++){
        var word = words[i];
        if(func(word)) matchingWord.push(word);
    }

    return matchingWord;
}