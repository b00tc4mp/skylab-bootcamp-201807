function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var numMax;
    if (numbers.length>=1){
        numMax=0;
        for(var i=0;i<numbers.length;i++){
            if (numbers[i]>numMax){
                numMax=numbers[i];
            }
        }
    }
    return numMax;
}