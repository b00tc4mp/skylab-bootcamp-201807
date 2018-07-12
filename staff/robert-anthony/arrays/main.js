function addAllElements(arr) {
  var accumulator = 0;
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    accumulator += +arr[i];
  }
  return accumulator;
}

console.log(addAllElements([1, 2, 3]));
console.log(addAllElements([1, 2, 3, 4, 5]));
console.log(addAllElements([1, 2, 3, 4, 5, 6]));


