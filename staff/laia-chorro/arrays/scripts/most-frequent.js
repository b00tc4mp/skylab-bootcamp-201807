function mostFrequent(array) {
    // returns and array with the most frequent elements
    var mostFrequent = [],
    maxTimes = 0;

    for (var i = 0; i < array.length; i++) {        
        var times = 0;

        for (var j = i+1; j < array.length; j++) {

            if (array[i] && array[i] === array[j]) {
                times++;
                if (times > maxTimes) {
                    mostFrequent = [];
                    maxTimes = times;
                }
                
                if (times === maxTimes) {
                    mostFrequent.push(array[i]);
                }
            }
        }
    }

    return mostFrequent;
}