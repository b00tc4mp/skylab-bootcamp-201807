var count = 0;

function recursiveFor(numbers, fun) {
    // TODO implement a for-loop without for, but just recursion
    if (mul2.length != 3) {
        fun(numbers[count]);
        count++
        recursiveFor(numbers, fun);
    } 
};

// opcion Manu
function _recursiveFor(array, callback) {
    // TODO implement a for-loop without for, but just recursion
    if (array.length) {
        callback(array[0]);
        recursiveFor(array.slice(1), callback);
    } 
};