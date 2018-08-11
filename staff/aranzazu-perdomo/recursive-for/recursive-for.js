function recursiveFor(numbers, callback) {
    function iterate(n){
        callback(numbers[n])
        if(n<numbers.length-1){
            iterate(++n);
        }
    }
    iterate(0);
}