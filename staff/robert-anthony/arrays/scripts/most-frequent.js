function mostFrequent(array) {
  //console.log("entering most frequ")
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

  var tmp = sort(arr,false,comparer);

  // console.log("tmp is ",tmp);
/*  arr.sort(function comparer(a, b) {
    return b.count - a.count;
  });*/

  for ( i = 0; i < tmp.length; i++) {
    if (i === 0) {
      returnArray.push(tmp[i].value)
    } else if (tmp[i].count === tmp[0].count) {
      returnArray.push(tmp[i].value)
    }
  }
  return returnArray;
}

function comparer(a, b) {
  return (b.count - a.count) === 1;
}