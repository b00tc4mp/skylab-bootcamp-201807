
/*function recursiveFor(array, fun) {
    // TODO implement a for-loop without for, but just recursion
    if (array.length) {
        fun(array[0]);
        recursiveFor(array.slice(1), fun);
    }
}*/



function recursiveFor(array, fun, count) {
    // TODO implement a for-loop without for, but just recursion
    count = count || 0;
    if (count < array.length) {
        fun(array[count]);
        count++;
        recursiveFor(array, fun, count);
    }
}
