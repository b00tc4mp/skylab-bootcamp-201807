//Add all elements

function addAllElements(array){
    res = 0;
        array.forEach(function(element) {
            res = res+element;           
          });
          return res;
}

console.log(addAllElements([1,2,3,4,5]) === 15); // => true
console.log(addAllElements([1,2,3,4,5,6]) === 21); // => true
console.log(addAllElements([1,2,3]) === 6); // => true

//Use only for or while
function addAllElements(array){
    res = 0;
        for(var i = 0;i<array.length;i++){
            res = res + array[i];
        }
          return res;
}