function map(array, func) {
    var arr = [];
    for (var i=0; i<array.length; i++){

       arr.push(func(array[i]));
    }


return arr;

}