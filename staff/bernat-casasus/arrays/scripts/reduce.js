function reduce(array, func, init) {
    // TODO see Array.prototype.reduce to understand it. re-implement it here accepting array as parameter (use of Array.prototype.reduce is forbidden)
    var result = [];
    var accum = 0;
    for(var i = 0; i < array.length; i++){
        accum = func(accum,array[i]);
    }
    return accum;



}