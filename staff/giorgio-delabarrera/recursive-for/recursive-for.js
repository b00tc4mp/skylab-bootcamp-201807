
function recursiveFor(elements, callback) {
    // TODO implement a for-loop without for, but just recursion
    var value = elements.shift();
    callback(value);
    if (elements.length) {
        recursiveFor(elements, callback);
    }
}