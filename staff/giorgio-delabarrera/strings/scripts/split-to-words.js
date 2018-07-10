function splitToWords(text) {

    var words = [];
    var word = '';
    var toAdd = false;

    for (var i = 0; i < text.length; i++) {
    
        var char = text[i];
        if (!isBlank(char) && !hasSymbol(char)) {
            toAdd = true;
            word = word.concat(char);
        }
        else {
            if (toAdd) {
                toAdd = false;
                words.push(word);
                word = '';
            }
        }
    }

    if (word.length) words.push(word);

    return words;
}