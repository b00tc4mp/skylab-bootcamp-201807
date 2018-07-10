function mostFrequent(array) {
  // returns and array with the most frequent elements
  var arr = [];
  var found;
  var returnArray = [];

  for (var i = 0; i < array.length; i++) {
    found = arr.find(function finder(element) {
      return element.value === array[i];
    });
    if (found) {
      found.count++
    } else
      arr.push({value: array[i], count: 1});
  }
  arr.sort(function comparer(a, b) {
    return b.count - a.count;
  });

  for ( i = 0; i < arr.length; i++) {
    if (i === 0) {
      returnArray.push(arr[i].value)
    } else if (arr[i].count === arr[0].count) {
      returnArray.push(arr[i].value)
    }
  }
  return returnArray;
}