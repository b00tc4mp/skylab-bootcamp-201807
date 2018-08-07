// count words
console.log("count words")
    function countWords(string) {
        var chars = 0;
        var regex = /[A-Za-z0-9\xC0-\xff]/ 
        for (var i = 0; i < string.length; i++){
            if ((i === (string.length - 1)) && (string[i].match(regex) !== null)){
            chars +=1;
            } else if ((string[i].match(regex) !== null) && (string[(i+1)].match(regex) === null)){
            chars +=1;    
            }
        }
        
        return chars;
    }