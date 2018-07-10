function reduce(array, func, initial) {
  var accumulator = initial || 0;
  for (var i = 0; i < array.length; i++) {
      func(accumulator,array[i]);
  }
  return accumulator;
}