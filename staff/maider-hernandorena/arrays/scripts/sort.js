function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    var x= [];
    for (var i = 1; i < array.length; i++) {
    for (var j = 0; j < i; j++)
        if (array[i] < array[j]) {
          array[i] = array[j];
          array[j] = x;
        }

    }

}

var chars = [2, 1, 3];

var sorted = sort(chars);

console.log(sorted.length === 3);
console.log(sorted[0] === 1);
console.log(sorted[1] === 2);
console.log(sorted[2] === 3);