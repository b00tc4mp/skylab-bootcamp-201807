function mostFrequent(array) {
    // returns and array with the most frequent elements
    var numbers = [];
    var count = 0;
    for(var i = 0; i < array.length; i++){
        
        for(var j = 0; j < array.length; j++){

            if(array[i] === array[j]){
                count++;
            }
        }

        if(count > 1 && numbers.indexOf(array[i]) === -1){
            numbers.push(array[i]);

        } 
        count = 0;
    }

    return numbers;

}