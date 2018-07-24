function recursiveFor(numbers, func) {
    // TODO implement a for-loop without for, but just recursion
    
    function index(n){
        func(numbers[n]);
        if(n < numbers.length-1) index(++n);  
    }
    index(0);
}


////

function recursiveFor(array, callback) {
    // TODO implement a for-loop without for, but just recursion
    
    if(array.length){
        callback(array[0]);
        recursiveFor(array.slice(1), callback);
    }
}

////

function recursiveFor(array, callback, index) {
    // TODO implement a for-loop without for, but just recursion
    var index = index || 0;
    if(index < array.length){
        callback(array[index]);
        recursiveFor(array, callback, ++index);
    }
}