function toCamelCase(string) {
        var words = splitToWords(string);
        var finalW = "";
               
        for (var j =0 ; j < words.length; j++){
         for (var k=0; k < words[j].length; k++){
            if (j !==0 && k === 0 ){
                finalW += words[j][0].toUpperCase();
            } else {
                finalW += words[j][k].toLowerCase();
            }
         }
        }
        
        return finalW
    
}