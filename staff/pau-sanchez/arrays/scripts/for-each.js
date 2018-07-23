function forEach(array, func) {
    // TODO implement a for-each 
    //(use of Array.prototype.forEach is forbidden)

    var strings = [];
    var plus2 = [];
    var lengths = [];


    for (var i = 0; i < array.length; i++){
        func(array[i]);
    }

    return strings;
    return plus2;
    return lengths;


}