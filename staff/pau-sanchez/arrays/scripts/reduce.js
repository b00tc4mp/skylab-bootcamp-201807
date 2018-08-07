function reduce(array, func, init) {
    // TODO see Array.prototype.reduce to understand it. 
    //re-implement it here accepting array as parameter 
    //(use of Array.prototype.reduce is forbidden)
    var accum = init;
    
    for (var i = 0; i < array.length; i++){
        
        accum =+ func(accum, array[i]);
        
        var sum = accum;
        var numberOfWordsWithL = accum;
        var total = accum;
        
    }
    
    return sum;
    return numberOfWordsWithL;
    return total;

}


