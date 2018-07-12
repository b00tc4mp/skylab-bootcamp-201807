function toCamelCase(string){
    string = string.toLowerCase();
    var words = splitToWords(string);
    var container = '';
    for (var i = 0; i < words.length; i++){
        
        var word = words[i];
        
        if (i === 0){
          container += word;
        } else {
          container += word[0].toUpperCase()+word.slice(1);
            
        }
    }
    
    return container;

}