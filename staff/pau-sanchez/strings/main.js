// count words

    function countWords(string) {
        var chars = 0;
        for (var i = 0; i < string.length; i++){
            if( (string[i] !== " " || string[i] !== " ") && (string[(i+1)] === " ")    ){
            chars +=1;
            }
        }
        if (chars > 0){chars+=1}
        return chars;
    }
   

    console.log(countWords("hello world") === 2);

    console.log(countWords("") === 0);

    console.log(countWords("1 2 3 4 5") === 5);

    console.log(countWords("  ") === 0);

    console.log(countWords("one   two     three   four  five") === 5);

 