function toCamelCase(string){
    var lower= string.toLowerCase();
    var words = [];
    words= splitToWords(lower);
    var word='';
    for (var i=0; i<words.length; i++){
        if (i>0){
          words[i][0] = words[i][0].toUpperCase().replace();
          for (var j=1; j<words[i].length; j++){
            var aux= words[i][j];  
            words[i] = words[i].concat(aux);

          }

        }
        word= word.concat(words[i]);
    }
console.log(word);
    return word;
}