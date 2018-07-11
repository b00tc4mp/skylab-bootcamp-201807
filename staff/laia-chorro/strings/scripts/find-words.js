// find words (that match expression in provided function)

function findWords(string, func) {
    // TODO: implement using a standard loop
    var words = splitToWords(string),
        matchedWords = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (func(word)) {
            matchedWords.push(word);
        }
    }

    return matchedWords;
}