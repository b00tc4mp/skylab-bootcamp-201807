function reduce(array, func, init) {
    // TODO see Array.prototype.reduce to understand it. re-implement it here accepting array as parameter (use of Array.prototype.reduce is forbidden)

   
    var num = 0
    var sum = 0
    for (var i = 0; i<array.length ; i++){
        num = array[i] 
        sum = func(sum, num);
    }
    return sum;

}

