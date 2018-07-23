// count words

function countWords(string) {
    var count = 0;
    var blankBefore = true;

    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        if (!isBlank(char)) {
            if (blankBefore && !hasSymbol(char)) {
                count++;

                blankBefore = false;
            }
        } else blankBefore = true;
    }

    return count;
}