function recursiveFor(numbers, func) {
    // TODO implement a for-loop without for, but just recursion
    var length=0;
    function count(value){
        if (value<numbers.length){
            func(numbers[value]);
            value++;
            count (value);
        }
    }
    count(length);
}
    