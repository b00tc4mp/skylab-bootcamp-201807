function map(array, func) {
    // TODO implement a map (it should work same to Array.prototype.map, but accepting the array as a parameter. use of Array.prototoype.map is forbidden)
    var arr = []
    for (var i = 0; i<array.length; i++){
        var num = func(array[i]);
        arr.push(num)
    }

    return arr

}
