
function toCamelCase(string) {

    var string = string.toLowerCase();

    var stringCamelCase = '';

    var words = splitToWords(string);

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        
        if (i == 0) {
            stringCamelCase = word;
        }
        else {
            word = word[0].toUpperCase() + word.slice(1);
            stringCamelCase += word;
        }
    }

    return stringCamelCase;
}