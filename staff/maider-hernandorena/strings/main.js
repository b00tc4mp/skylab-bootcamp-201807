//count words

function countWords(string){
    //TO DO: count words in string using a standard loop (split and trim are forbidden), taking into account spaces and tabs
    function space(value) {
        return [" ","   "].indexOf(value) > -1;
    };
        var result = 0;
        if (string.length) {
            if (!space(string[0])) { 
                result++ 
            };
            for (var i = 1; i < string.length; i++) {
                var currentChar = string[i];
                var previousChar = string[i - 1];
                if (!space(currentChar) && space(previousChar)) {
                    result++;
                }
            }
        }
        return result;
    };

console.log(countWords("hello world") === 2); // => true

console.log(countWords(" hello world") === 2); // => true

console.log(countWords("hello world ") === 2); // => true

console.log(countWords(" ") === 0); // => true

console.log(countWords("    ") === 0); // => true

console.log(countWords("1 2 3 4 5") === 5); // => true

console.log(countWords("one two     three    four       five") === 5); // => true