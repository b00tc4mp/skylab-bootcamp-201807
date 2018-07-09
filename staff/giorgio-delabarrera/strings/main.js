
console.log(countWords(' hello    world') === 2);    // => true

console.log(countWords('') === 0);    // => true

console.log(countWords('1 2 3 4 5') === 5);    // => true


function countWords(words) {

    var count = 0;

    var isLetter = function(character) {
        return character !== ' ';
    }

    var hasLetter = false;

    for (var i = 0; i < words.length; i++) {
        
        var character = words[i];
        
        if (isLetter(character)) {
            if (!hasLetter) {
                hasLetter = true;
                count++;
            }
        }
        else {
            hasLetter = false;
        }   
    }

    return count;
}