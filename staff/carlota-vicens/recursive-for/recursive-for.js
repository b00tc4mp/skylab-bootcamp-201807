function recursiveFor (array, fun){
    // TODO implement a for-loop without for, but just recursion
    var position= 0;
    if (position<array.length){
        fun(array[position]);
        recursiveFor(array, fun);
    }  
    position++;
}




function recursiveFor(array, callback) {
    // TODO implement a for-loop without for, but just recursion
    if (array.length){
        callback(array[0]);
        recursiveFor(array.slice(1) , callback);
    }
}

function recursiveFor(array, callback, index){
    var index = index || 0;
    if (index<array.length){
        callback(array[index]);
        recursiveFor(array, callback, ++index);
    }
}