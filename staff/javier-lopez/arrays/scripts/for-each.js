function forEach(array, func) {
    // TODO implement a for-each (use of Array.prototype.forEach is forbidden)
    var numbers = [];
    for( var i = 0; i < array.length; i++){
        numbers.push(func(array[i]));
    }
    return numbers;
}