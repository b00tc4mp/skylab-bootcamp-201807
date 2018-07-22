// implement a for loop without recursion
function _recursiveFor(array, func) {
    if(array.length) {
        func(array[0]);
        recursiveFor(array.slice(1), func);
    }
}

function _recursiveFor(array, func) {
    if(array.length == 1) {
        func(array[0]);
    } else {
        var mid = parseInt(array.length / 2);
        recursiveFor(array.slice(0,mid),func);
        recursiveFor(array.slice(mid),func);
        //recursiveFor(array.splice(0,mid),func);
        //recursiveFor(array,func);
    }
}

function recursiveFor(array, func, index) {
    index = index || 0;
    if(index < array.length) {
        func(array[index]);
        recursiveFor(array, func, ++index);
    }
}