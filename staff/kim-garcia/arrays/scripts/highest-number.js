function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var num = 0
    if(numbers.length < 1){num = undefined; }

    for (var i = 0; i<numbers.length ; i++){
        if(typeof numbers[i] === "number" && numbers[i] > num){
            num = numbers[i];
        } 
    }
    return num
}
