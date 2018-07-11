function countWords(text) {
    var count = 0;
    var blankBefore = true;

    for (var i = 0; i < text.length; i++) {
        var char = text[i];

        if (!isBlank(char)) {
            if (blankBefore && !hasSymbol(char)) {
                count++;

                blankBefore = false;
            }
        } else blankBefore = true;
    }

    return count;
}