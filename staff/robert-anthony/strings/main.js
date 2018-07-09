function countWords(stringy) {
  var words = 0;

  var whitespacechars = 0;
  var nonwhitespacechars = 0;
  var newword = false;
  var ch;

  for (var i = 0; i < stringy.length; i++) {


    ch = stringy.charAt(i);

    if ((ch == ' ') || (ch == '\t') || (ch == '\n')) {
      if (newword) {
        words++;
        newword = false;
      }
      whitespacechars++;
    } else {
      nonwhitespacechars++;
      if (!newword) {
        newword = true;
      }
    }
  }
  if (newword) {
    words++;
  }
  return words;
}


console.log(countWords("     "));
//console.log(countWords(""));


// "hello world" .. 2
// '' .. 0
// '1 2 3 4 5' .. 5
// '      ' .. 0
// 'one     two    three   ' .. 3
// taking into account tabs and spaces


