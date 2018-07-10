function reduce(array, func, initial) {
  var acc = initial || 0;
  for (var i = 0; i < array.length; i++) {
     acc = func(acc,array[i]);
  }
  return acc;
}