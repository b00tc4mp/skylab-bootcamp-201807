function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    var arr = []
    var otro


    for (var i = 0; i<array.length ; i++){
        if (array[i] > otro) {
            arr.push(array[i]);
            otro = array[i];
        } else {
            arr.unshift(array[i]);
            otro = array[i];
        }
    }

    if(reverse){
        arr.reverse()
    }

    return arr
}

