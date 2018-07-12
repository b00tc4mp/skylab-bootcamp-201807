function map(array, func) {
    // TODO implement a map (it should work same to Array.prototype.map, but accepting the array as a parameter. use of Array.prototoype.map is forbidden)
    var res=[];
    array.forEach(function(e){
        res.push(func(e));
    });
    return res;
}