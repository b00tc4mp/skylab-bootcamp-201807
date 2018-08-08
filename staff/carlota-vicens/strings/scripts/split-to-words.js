// split to words

function splitToWords(string) {
  
    var aux='';
    var words= [];
    var blankBefore = true;

    for (var i = 0; i < string.length; i++) {
        var char = string[i];
       
            if (!isBlank(char) && !hasSymbol(char) ) {
                aux= aux.concat(char);
            }else if (aux.length){
                words.push(aux);  
                aux= ''; 
            }
        }

    
    if(aux.length) words.push(aux);
    
    return words; 
    
    }
