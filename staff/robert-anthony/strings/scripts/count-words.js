
function countWords(stringy) {
  var words = 0;
  var newword = false;

  for (var i = 0; i < stringy.length; i++) {
    if (whitespace(stringy.charAt(i))) {
      if (newword) words++;
      newword = false;
    } else {
      newword = true;
    }
  }
  if (newword) words++;
  return words;
}