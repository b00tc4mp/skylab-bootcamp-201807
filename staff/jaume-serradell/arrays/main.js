// add all elements

function addAllElements(arr) {
    
    var res = 0
    for(var i=0; i<arr.length; i++) {
        res += arr[i];
        console.log(res);

    }
    return res
}

console.log(addAllElements([1, 2, 3, 4, 5]) === 15); // => true

console.log(addAllElements([1, 2, 3, 4, 5, 6]) === 21); // => true

console.log(addAllElements([1, 2, 3]) === 6); // => true




