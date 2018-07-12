
// split to words

function splitToWords(string) {
  var words = [];
  var wordStart = 0;
  var inWord = false;
  var isWhiteOrSym;
var ch;

  for (var i = 0; i < string.length; i++) {
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

// split to words

function _splitToWords(string) {
  var words = [];
  var currentWord = '';

  for (var i = 0; i < string.length; i++) {
    var char = string[i];

    if (!isBlank(char) && !hasSymbol(char)) {
      //currentWord += char;
      currentWord = currentWord.concat(char);
    } else if (currentWord.length) {
      words.push(currentWord);

      currentWord = '';
    }
  }

  if (currentWord.length) words.push(currentWord);

  return words;
}

