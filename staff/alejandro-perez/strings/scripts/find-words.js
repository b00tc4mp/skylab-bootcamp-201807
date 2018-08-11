// find words (that match expression in provided function)

function findWords(string, func) {
   var words = splitToWords(string);
   for (var i = 0; i < words.length;) {
       if (func(words)) {
           words.splice(i,1);
       }
       else i++;
   }
   return words;
}