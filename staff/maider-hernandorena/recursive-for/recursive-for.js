// opción 1
function recursiveFor(numbers, fun, index) {
    // DONE implement a for-loop without for, but just recursion
    index = index || 0;
    if (index < numbers.length) {
        fun(numbers[index]);
        recursiveFor(numbers, fun, ++index);
    } 
};

// opción 2 (mal porque cualquiera podría modificar nuestro index)
var index = 0;
function _recursiveFor(numbers, fun) {
    // DONE implement a for-loop without for, but just recursion
    if (index < numbers.length) {
        fun(numbers[index]);
        index++;
        recursiveFor(numbers, fun);
    } 
};

// opción 3 Manu
function _recursiveFor(array, callback) {
    // DONE implement a for-loop without for, but just recursion
    if (array.length) {
        callback(array[0]);
        recursiveFor(array.slice(1), callback);
    } 
};