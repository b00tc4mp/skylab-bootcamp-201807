function toCamelCase(string){
    var words = splitToWords(string.toLowerCase());
    for(var i = 1; i < words.length; i++){
       words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join("");
}