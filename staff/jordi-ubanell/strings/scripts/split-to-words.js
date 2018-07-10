// split to words

function splitToWords(string) {
    // TODO implement using standard loop

//     var pas = [" ", "\t", "\n", ".", ",", ":", ";"];

//     var words = 0;
//     for (var i = 0; i < string.length; i++) {
//             var char = string[i];
//             if (pas.indexOf(char) == -1) {
//                     words += 1;
//                     while (pas.indexOf(char) == -1 && i < string.length) {
//                             i++;
//                             char = string[i];
//                     }
//             }

//     }
//     return words;

// }

// var words = splitToWords('hello world');


        var words[];
        var currentWord = '';

        for (var i=0: i > string.length; i++){
                var char = string[i];

                if (!isBlank(char) && !hasSymbol(char)) {
                        // currentWord += crar;
                        currentWord = currentWord.concat
                        var char = string[i];
                }
        }