function sort(array, reverse) {
  // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)

  do {


    var swapped = false;
    var tmp;

    for (var i = 1; i < array.length - 1; i++) {
      if (array[i - 1] > array[i]) {
        tmp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = tmp;
        swapped = true;
      }

    }
  } while (swapped) ;
  if (reverse) return array.reverse();
  else return array;
}