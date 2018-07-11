function forEach(array, func) {
    // TODO implement a for-each (use of Array.prototype.forEach is forbidden)
    for (var i=0;i<array.length;i++){
        func(array[i]);
    }
}