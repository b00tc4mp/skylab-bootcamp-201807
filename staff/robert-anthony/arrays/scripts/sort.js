function sort(array, reverse,compareFunctionParam) {
  // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
  var sorted = false;
  // console.log("compareFUnctionParam",compareFunctionParam);
  var compareFunction = compareFunctionParam || ownComparer;
 /* var nothing = {count:3};
  var more_nothing = {count:4};
  console.log(compareFunction(nothing,more_nothing));*/
  while (!sorted) {
    sorted = true;


    var tmp;

    for (var i = 1; i < array.length; i++) {
      if (compareFunction(array[i - 1], array[i])) {
        tmp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = tmp;
        sorted = false;
      }

    }

  }
  if (reverse) {
    return array.reverse();
  } else {
    return array;
  }
}

function ownComparer(a,b) {
  return a > b;
}


