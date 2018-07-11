function reduce(array, func, init) {
    // TODO see Array.prototype.reduce to understand it. re-implement it here accepting array as parameter 
    // (use of Array.prototype.reduce is forbidden)
    var accum = init;
    for (var i = 0; i < array.length; i++) {
        accum += func(init, array[i]);
    }

    return accum;
}