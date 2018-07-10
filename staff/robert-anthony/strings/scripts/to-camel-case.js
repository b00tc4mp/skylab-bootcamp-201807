function _toCamelCase(string) {
  var words = splitToWords(string);
  words.map(function (word, i) {
    word = word.toLowerCase();
    if (i != 0) word[0] = word[0].toUpperCase();
  });
  return words.join('');


}

function toCamelCase(string) {
  var words = splitToWords(string);
  var tempWord = '';
  var returnString = "";
  var word;

  for (var i = 0; i < words.length; i++) {
    word = words[i];
    tempWord = '';
    if (i === 0) {
      returnString = word.toLowerCase();
    } else {
      for (j = 0; j < word.length; j++) {
        if (j === 0) {
          tempWord = tempWord.concat(word[j].toUpperCase());
        } else {
          tempWord = tempWord.concat(word[j].toLowerCase())
        }
      }
      returnString = returnString.concat(tempWord);
    }
  }
  return returnString;
}