
function _findWords(string, func) {
  // TODO: implement using a standard loop
  var words = [];
  var wordStart = 0;
  var inWord = false;
  var isPuncOrWhitespace;
  var tmpString = '';
  var ch;

  for (var i = 0; i <= string.length; i++) {
    ch = string[i];
    isPuncOrWhitespace = isBlank(ch) || hasSymbol(ch);
    if (inWord && isPuncOrWhitespace) {
      tmpString = string.slice(wordStart, i);
      if (func(tmpString)) words.push(tmpString);
      inWord = false;
    } else if (!inWord && !isPuncOrWhitespace) {
      wordStart = i;
      inWord = true;
    }
  }
  if (inWord) {
    tmpString = string.slice(wordStart, i);
    if (func(tmpString)) words.push(tmpString);
  }
  return words;
}

function findWords(string,func) {
  return splitToWords(string).filter(function(element){
    return func(element);
  });

}