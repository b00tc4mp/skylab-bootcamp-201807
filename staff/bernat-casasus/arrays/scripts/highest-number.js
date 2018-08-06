function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var maxNum = 0;
    var current = 0;
    if(numbers.length){
        for(var i = 0; i < numbers.length; i++){
            current = numbers[i];
            if(current > maxNum) maxNum = current;
        }
    }else {
        maxNum = undefined;
    }
    return maxNum;
}