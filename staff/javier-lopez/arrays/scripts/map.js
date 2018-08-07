function map(array, func) {
    // TODO implement a map (it should work same to Array.prototype.map, but accepting the array as a parameter. use of Array.prototoype.map is forbidden)
    var name = '';
    var operationFinished = [];
    for(var i = 0; i < array.length;i++){
        name = array[i];
        var complete = func(name);
        operationFinished.push(complete);
    }
    return operationFinished;
}