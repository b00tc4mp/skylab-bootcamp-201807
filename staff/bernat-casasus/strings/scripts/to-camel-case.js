function toCamelCase(string) {
    // TODO return string into camelCase
   var words = splitToWords(string);
   
   if(words.length){
       for(var i = 0; i < words.length; i++){
           words[i] = words[i].toLowerCase();
       }
        if(words.length === 1){
            return words.join("");
        }       
   }

}

// separar palabras si son + de 1
//pasar las 2 a lowercase 
//la primera letra de la 2a palabra .toUpperCase()
//concatenar 