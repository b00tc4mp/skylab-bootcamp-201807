// TODO implement a for-loop without for, but just recursion

function _recursiveFor(array, callback) {
    if (array.length) {
        callback(array[0]);

        recursiveFor(array.slice(1), callback);
    }
}

function recursiveFor(array, callback, index) {
    index = index || 0;

    if (index < array.length) {
        callback(array[index]);

        recursiveFor(array, callback, ++index);
    }
}