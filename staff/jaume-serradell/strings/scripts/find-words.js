function findWords(string, func) {
    // TODO: implement using a standard loop

    var words = splitToWords(string);

    var matchingWords = [];

    for(var i=0; i<words.length; i++) {
        var word = word[i];

        if(func(word)) matchingWords.push(word);

    }

    return matchingWords;
}