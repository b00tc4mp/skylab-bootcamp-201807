function mostFrequent(array) {
    // returns and array with the most frequent elements
    var elements = [];
    var frequency = [];
    var maxFreq = 0;
    for(var i=0; i<array.length; i++) {
        var e = array[i];
        if(elements.indexOf(e) == -1) {
            elements.push(e);
            var cnt = 0;
            for(var j=0; j<array.length; j++) {
                if(e == array[j])
                    cnt++;
            }
            if(cnt > maxFreq)
                maxFreq = cnt;
            frequency.push(cnt);
        }
    }
    var mostFrequent = [];
    for(var i=0; i<elements.length; i++) {
        if(frequency[i]==maxFreq)
            mostFrequent.push(elements[i]);
    }
    return mostFrequent;
}