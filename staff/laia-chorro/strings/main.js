// count words

function countWords(string) {
    // TODO: count words in string using a standard loop

    var words = 0,
        string = string.trim();
    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1],
            space = ' ' || ' ';
        
    }


    return words;
}

console.log(countWords('hello world') === 2); // => true

console.log(countWords('') === 0); // => true

console.log(countWords('1 2 3 4 5') === 5); // => true

console.log(countWords('one two  three          four     five  ') === 5); // => true

// Ex2: find words (that match expression in provided function)


