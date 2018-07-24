function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    var result = [];
    var long = array.length;
    if (typeof array[0] !== 'string') {
        if (reverse === false || reverse === undefined) {
            for (var i = 0; i < long; i++) {
                result.unshift(highestNumber(array));
                array.splice(array.indexOf(highestNumber(array)), 1);
            }
        } else {
            for (var i = 0; i < long; i++) {
                result.push(highestNumber(array));
                array.splice(array.indexOf(highestNumber(array)), 1);
            }
        }
        return result;
    } else {
        if (reverse === false || reverse === undefined) {

            for (var i = 0; i < long; i++) {
                result.unshift(highestLetter(array));
                array.splice(array.indexOf(highestLetter(array)), 1);
            }


        } else {


            for (var i = 0; i < long; i++) {
                result.push(highestLetter(array));
                array.splice(array.indexOf(highestLetter(array)), 1);
            }

        }
        return result;
    }


}


function highestLetter(letters) {
    // TODO return the highest number found in letters (use of Math max or min is forbidden)
    var maxLetter = "a";
    var current = "";
    if (letters.length !== 0) {
        for (var i = 0; i < letters.length; i++) {

            current = letters[i];
            if (current > maxLetter) maxLetter = current;
        }
    } else {
        maxLetter = undefined;
    }

    return maxLetter;
}
