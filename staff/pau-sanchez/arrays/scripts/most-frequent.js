function mostFrequent(array) {
    // returns and array with the most frequent elements
    var base = [];
    var frequent = [];


    for (var i = 0; i < array.length; i++){
        if (base.indexOf(array[i]) === -1){
            base.push(array[i])
        } else if (base.indexOf(array[i]) > -1){
            frequent.push(array[i])
        }
    }

    
    return frequent;

}