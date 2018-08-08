// count words

function splitToWords(string) {
  
    var aux="";
    var words= [];
    var blankBefore = true;

    for (var i = 0; i < string.length; i++) {
        var char = string[i];
        if (!hasSymbol(char)){
        if (!isBlank(char) ) {
            aux.concat(char);
        }else {
            words.push(aux);
            aux="";

            
        }}

    }

    return words;

}
