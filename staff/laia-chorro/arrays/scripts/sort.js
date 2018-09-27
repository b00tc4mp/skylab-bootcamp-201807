function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    var sortedArray = [],
        lengthArray = array.length;

    for (var i = 0; i < lengthArray; i++) {
        var maxNum = highestNumber(array);
        array.splice(array.indexOf(maxNum), 1); // remove the current highest number from the array

        if (reverse) {
            sortedArray.push(maxNum);
        } else {
            sortedArray.unshift(maxNum);
        }
    }

    return sortedArray;
}