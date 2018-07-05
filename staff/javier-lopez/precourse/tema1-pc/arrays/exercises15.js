//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras
    //Recources: https://teamtreehouse.com/community/how-to-count-the-number-of-times-a-specific-character-appears-in-a-string

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
    var name = word;
    var stringBase = [];
    word = word.toUpperCase();
    stringBase = word.split("");
    var countObject = {} ;



    for (var i = 0, l = stringBase.length; i < l; i++) {
        var currentChar = stringBase[i];
        countObject[currentChar] = characterCount(word, currentChar);
    }

    var letter = "";
    var lettersTogether = "";
    for(var i = 0; i <stringBase.length;i++){
        var currentChar = stringBase[i];

    if(countObject[currentChar] !== 0 && countObject[currentChar] === 1){

        if(currentChar !== " "){
                    letter = letter+currentChar+", ";
        }
        lettersTogether = lettersTogether+currentChar;
        var finalResult = name+", the letters "+letter.toLowerCase()+" are not repeated, the name is => "+lettersTogether.toLowerCase();

    }
}
        console.log(finalResult);

}

//console.log(charCount("Javier Lopez"));
charCount("Javier Lopez");