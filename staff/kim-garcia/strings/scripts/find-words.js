// find words (that match expression in provided function)
// funcion que accepta otra funcion como parametro. Higher over function
//devera separar en palabras lo q le pasemos i ver si coincide con otra palabra
function findWords(string, func) {
    // TODO: implement using a standard loop
    var words = splitToWords(string);  //dividimos el string en palabras. Debemos filtrarlas con las q cumplen con la funcion

    var matchingWords = []

    for (var i= 0; i < words.length; i++) {  // oye funcion, para esta word mira si cumple el if siguiente
        var word = words[i]; 
        
        if (func(word)) matchingWords.push(word); //true {si solo hay un statment no hacen falta}
    }
    return matchingWords;
}


