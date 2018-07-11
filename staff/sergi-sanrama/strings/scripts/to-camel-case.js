// console.log(toCamelCase('hello world') === 'helloWorld'); // true

function toCamelCase(string){
   var stringLowerCase = string.toLowerCase(),
        //wordsArray = splitToWords(stringLowerCase), //Utilitzem funcio split ["hello", "world"]
        wordsArray = stringLowerCase.split(' '),
        myCamelCase = '';

    for (var i = 0; i < wordsArray.length; i++) {
        var currentWord = wordsArray[i]; //  "hello", "world" son strings, elements del array pos 0 y 1
        if (i > 0) { // a partir de la 2a iteracio entrem aqui
            var myCapitalFirstLetter = currentWord.charAt(0).toUpperCase(); // "W"
            currentWord = myCapitalFirstLetter.concat(currentWord.slice(1)); //"World"
        }
        myCamelCase += currentWord;
    }
   return myCamelCase;


}