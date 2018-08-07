function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var highestNumber = numbers[0];
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] > highestNumber) {
            highestNumber = numbers[i];
        }
    }

    return highestNumber;
}