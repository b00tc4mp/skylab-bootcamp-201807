// count words

    function countWords(string){
        // TODO: count words in string using a standard loop (split and trim are forbidden), taking into account spaces and tabs
        var count = 0;
        for(var i = 0; i < string.length; i++){
            if(string.charAt(i) !== "\b" && string.charAt(i) !== "\n" && string.charAt(i) !== "\t" && string.charAt(i) !== " " && string.charAt(i) !== "    "){
                if(i === 0){
                    count++;
                }else if(string.charAt(i-1) === (" " || "	")){
                    count++;
                }
            }
        }
        return count;
    }

    //solucion de Alex
    function isSpace(value) {
        return ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].indexOf(value) > -1;
      };
      
      function countWords(str) {
          var count = 0;
          if (str.length) {
              if (!isSpace(str[0])) { count++ };
              for (var i = 1; i < str.length; i++) {
                  var curr = str[i];
                  var prev = str[i - 1];
                  if (!isSpace(curr) && isSpace(prev)) {
                      count++;
                  }
              }
          }
          return count;
      };

    //solucion manu

    console.log(countWords('hello world') === 2); // => true
    console.log(countWords('') === 0); // => true
    console.log(countWords('1 2 3 4 5') === 5); // => true
    console.log(countWords('    ') === 0); // => true
    console.log(countWords('one   two       three   four     five') === 5); // => true
    console.log(countWords('hello world \t\n') === 2); //true
    console.log(countWords('... ,,, ;;; :::') === 0); //true


// split to words

    function splitToWords(string) {
        // TODO implement using standard loop
        var result = [];
        var strConcatenate = "";
        console.log(string);

        if(tiene_letras(string) === 1){
            for(var i = 0; i < string.length; i++){
                if(string.charAt(i) !== (" " || "    ")){
                    if(i === 0){
                        strConcatenate = string.charAt(i);
                        console.log(strConcatenate);
                    }else{
                        strConcatenate += string.charAt(i);
                        console.log(strConcatenate);
                    }
                }else if(string.charAt(i) === (" " || "    ")){
                        result.push(strConcatenate);
                        strConcatenate = "";
                }
            }
            result.push(strConcatenate);
            console.log(result);
            return result;

        }else if(tiene_letras(string) === 0){
            console.log(result);
            return result;

        }

        return result;
    }
    var letters="abcdefghyjklmnñopqrstuvwxyz";
    function tiene_letras(words){
        words = words.toLowerCase();
        for(i=0; i<words.length; i++){
           if (letters.indexOf(words.charAt(i),0)!=-1){
              return 1;
           }
        }
        return 0;
     }

    var words = splitToWords('hello world');

    console.log(words.length === 2); // => true
    console.log(words[0] === 'hello'); // => true
    console.log(words[1] === 'world'); // => true

    var words = splitToWords('a b c');

    console.log(words.length === 3); // => true
    console.log(words[0] === 'a'); // => true
    console.log(words[1] === 'b'); // => true
    console.log(words[2] === 'c'); // => true

    var words = splitToWords('      ');

    console.log(words.length === 0); // => true


// find words (that match expression in provided function)

    function findWords(string, func) {
        // TODO: implement using a standard loop

    }


    var words = findWords('hello world', function(word) { 
        return word.indexOf('e') > -1; 
    });

    console.log(words.length === 1); // => true
    console.log(words[0] === 'hello'); // => true

    var words = findWords('hello world, hello universe', function(word) { 
        return word.indexOf('o') > -1; 
    });

    console.log(words.length === 3); // => true
    console.log(words[0] === 'hello'); // => true
    console.log(words[1] === 'world'); // => true
    console.log(words[2] === 'hello'); // => true

    for(var i = 0; i < string.length; i++){

    }