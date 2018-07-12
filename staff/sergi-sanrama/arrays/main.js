// add all elements

function addAllElements(array){
    var result = 0;

    for (var i = 0; i<array.length; i++){
        result += array[i];
  }
  return result;
}


console.log(addAllElements([1,2,3,4,5]) === 15); // => true
console.log(addAllElements([1,2,3,4,5,6]) === 21); // => true
console.log(addAllElements([1,2,3]) === 6); // => true