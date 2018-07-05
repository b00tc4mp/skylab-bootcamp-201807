//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?

function characterCount(word, character) {
   var count = 0;
    for (var i = 0; i < word.length; i++) {
       if (word[i] === character) {
           count++;
       }
  }
  return count;
}

function charCount(word){
    //Una posible modificación seria que en vez de coger un ARRAY con el abecederario creara un ARRAY NUEVO con las letras del string.
    var stringBase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','_'];
    var countObject = {} ;
        var name = word;
    word = word.toUpperCase();
    var strBase = stringBase.join("").toUpperCase();
     stringBase = strBase.split("");
    console.log(stringBase);

    for (var i = 0, l = stringBase.length; i < l; i++) {
        var currentChar = stringBase[i];
        countObject[currentChar] = characterCount(word, currentChar);
    }

    for(var i = 0; i <stringBase.length;i++){
        var currentChar = stringBase[i];

    if(countObject[currentChar] !== 0 && countObject[currentChar]>=2){

        var finalResult = name+", the letter '"+currentChar+"'' => "+countObject[currentChar]+" times.";
        console.log(finalResult);

    }
}


}

console.log(charCount("Javier Lopez"));