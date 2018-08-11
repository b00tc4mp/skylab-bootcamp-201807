function mostFrequent(array) {
    // returns and array with the most frequent elements
    var mostFrequent = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = i+1; j < array.length; j++) {
            if (array[i] === array[j]) {
                mostFrequent.push(array[j]);
            }
        }
    }
    return mostFrequent;
}