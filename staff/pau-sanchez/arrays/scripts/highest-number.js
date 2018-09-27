function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var arrHolder = [0] 
    
    if (numbers.length < 1){return undefined};
    for ( var i = 0; i < numbers.length; i++) {
        if (numbers[i] > arrHolder[0]){
            arrHolder[0] = numbers[i]
        }
    }
    return arrHolder[0];
}