function forEach(numbers, func) {
    var res=[];
    for (var i = 0; i < numbers.length; i++) {
        res.push(func(numbers[i]));
    }
    return res;
}