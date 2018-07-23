// add all elements

function addAllElements(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
    
}


console.log(addAllElements([1,2,3,4,5]) === 15);

console.log(addAllElements([1,2,3,4,5,6]) === 21);

console.log(addAllElements([1,2,3]) === 6);