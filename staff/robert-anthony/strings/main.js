"use strict"

function whitespace(string) {
  //  var regex = RegExp(/^\s*$/);
  // return regex.test(string);
  return (string == ' ') || (string == '\t') || (string == '\n');
}


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


//console.log(countWords(" g  s s f    a"));
//console.log(countWords(""));


// "hello world" .. 2
// '' .. 0
// '1 2 3 4 5' .. 5
// '      ' .. 0
// 'one     two    three   ' .. 3
// taking into account tabs and spaces


// split to words

function splitToWords(string) {
  var words = [];
  var wordStart = 0;
  var inWord = false;
  var isWhitespace;

  for (var i = 0; i < string.length; i++) {
    isWhitespace = whitespace(string[i]);
    if (inWord && isWhitespace) {
      words.push(string.slice(wordStart, i));
      inWord = false;
    } else if (!inWord && !isWhitespace) {
      wordStart = i;
      inWord = true;
    }
  }
  if (inWord) words.push(string.slice(wordStart, i));
  return words;
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
console.log("....");
console.log(words);
console.log(words.length === 0); // => true


// find words (that match expression in provided function)


function punctuationOrWhiteSpace(string) {
  var regex = /[\s  _.,;?:!"'/$]+/;
  return regex.test(string);
}

function findWords(string, func) {
  // TODO: implement using a standard loop
  var words = [];
  var wordStart = 0;
  var inWord = false;
  var isPuncOrWhitespace;
  var tmpString = '';

  for (var i = 0; i <= string.length; i++) {
    isPuncOrWhitespace = punctuationOrWhiteSpace(string[i]);
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

var words = findWords('hello world', function (word) {
  return word.indexOf('e') > -1;
});
console.log(words.length === 1); // => true
console.log(words[0] === 'hello'); // => true

var words = findWords('hello world, hello universe', function (word) {
  return word.indexOf('o') > -1;
});
console.log(words.length === 3); // => true
console.log(words[0] === 'hello'); // => true
console.log(words[1] === 'world'); // => true
console.log(words[2] === 'hello'); // => true


