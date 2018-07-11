function reduce(array, func, init) {
    var arr= [];
    for (var i=0; i<array.length; i++){
        if(i==array.length-1){
            arr.push(func(array[i]));

        }

    }
    return arr;
}