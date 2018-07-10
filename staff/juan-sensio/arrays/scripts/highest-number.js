function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var max = numbers[0];
    for(var i=1; i<numbers.length; i++)
        if(numbers[i]>max)
            max = numbers[i];
    return max;
}