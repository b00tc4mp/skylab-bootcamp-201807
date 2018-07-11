function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    for(var i=1; i < array.length; i++) {
        var tmp = array[i];
        var j=i;
        while(j > 0 && array[j-1] >= tmp) {
            array[j] = array[j-1];
            j--;
        }
        array[j] = tmp;
    }
    if(reverse)
        array = reverseArray(array);
    return array;
}

function reverseArray(array) {
    var newArray = [];
    for(var i=0; i<array.length; i++)
        newArray[i] = array[array.length-i-1];
    return newArray;
}