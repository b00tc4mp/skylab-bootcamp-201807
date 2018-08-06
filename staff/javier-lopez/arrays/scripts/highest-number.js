function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var highest = 0;
    if(numbers.length){
        for(var i = 0; i<numbers.length;i++){
            if(numbers[i]>highest){
                highest = numbers[i];
            }
        }
        return highest;
    }else{
        return undefined;
    }

}