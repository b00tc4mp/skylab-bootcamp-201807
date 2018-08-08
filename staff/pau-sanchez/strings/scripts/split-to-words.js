


function reg(char) {
    var regex = /[A-Za-z0-9\xC0-\xff]/;
    return (char.match(regex) !== null)
}





function splitToWords(string) {
    
    var wordsArray = [];
    var whileword = "";
    
    for (var i = 0; i < string.length; i++){
        var char = string[i];
        
        if (reg(char) && (i === (string.length-1))){
            whileword += char;
            wordsArray.push(whileword);
            whileword = "";
        }else if (reg(char)){
                whileword += char    
        } else if (!reg(char) && whileword.length > 0){
            wordsArray.push(whileword);
            whileword = "";
        }
    }
    
    return wordsArray
}




