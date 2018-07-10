
// split to words

function splitToWords(string) {
  var words = [];
  var wordStart = 0;
  var inWord = false;
  var isWhiteOrSym;
var ch;

  for (var i = 0; i <= string.length; i++) {
    ch = string[i];
    isWhiteOrSym = isBlank(ch) || hasSymbol(ch);
    if (inWord && isWhiteOrSym) {
      words.push(string.slice(wordStart, i));
      inWord = false;
    } else if (!inWord && !isWhiteOrSym) {
      wordStart = i;
      inWord = true;
    }
  }
  if (inWord) words.push(string.slice(wordStart, i));
  return words;
}

