function reduce(array, func, init) {
    // TODO see Array.prototype.reduce to understand it. re-implement it here accepting array as parameter (use of Array.prototype.reduce is forbidden)

    var accumulator;
    if (array.length === 0) {
        throw new Error('Reduce of empty array with no initial value');
    }
    else accumulator = array[0];

    if (typeof init !== 'undefined') {
        accumulator = init;
    }

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        accumulator = func(accumulator, element);
    }
    
    return accumulator;
}