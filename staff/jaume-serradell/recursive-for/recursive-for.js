function recursiveFor(array, func) {
    if(array.length) {
        func(array[0]);
        recursiveFor(array.slice(1), func);
    }
}