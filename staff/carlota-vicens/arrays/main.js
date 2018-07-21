//add all elements

//console.log(addElements([1,2,3,4,5])===15); // true
//console.log(addElements([1,2,3,4,5,6])===21); // true
//console.log(addElements([1,2,3])===6); // true

function addElements(array){
    var res=0;
    for (var i=0; i<array.length; i++ ){
        res +=array[i];
    }
    return res;
}
console.log(addElements([1,2,3,4,5])===15); // true
console.log(addElements([1,2,3,4,5,6])===21); // true
console.log(addElements([1,2,3])===6); // true



