function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var maxNum;

    for (var i = 0; i < numbers.length; i++) {
        var num = numbers[i];

        if ((!maxNum || num > maxNum)) {
            maxNum = num;
        }
    }

    return maxNum;
}