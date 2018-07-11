
function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    
    var highestNumber = undefined;
    if (numbers.length) {
        highestNumber = 0;
        for (var i = 0; i < numbers.length; i++) {
            var number = numbers[i];
            if (isNumber(number)) {
                highestNumber = (number > highestNumber) ? number : highestNumber;
            }
        }
    }
    return highestNumber;
}