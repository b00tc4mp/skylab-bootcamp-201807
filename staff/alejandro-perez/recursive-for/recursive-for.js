function recursiveFor(numbers,func) {
    if(numbers.length) {
        func(numbers[0])
        return recursiveFor(numbers.slice(1),func)
    }
}