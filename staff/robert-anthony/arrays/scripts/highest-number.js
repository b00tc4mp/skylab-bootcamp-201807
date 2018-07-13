function highestNumber(numbers) {
  var cur;

  // TODO return the highest number found in numbers (use of Math max or min is forbidden)
  for (var i= 0; i<numbers.length; i++){
    if (i === 0) {
      cur = numbers[i];
    } else {
      cur = numbers[i] > cur ? numbers[i] : cur;
    }
  }
  return cur;
}