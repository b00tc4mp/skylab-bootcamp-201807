// add all elements


function addAllElements(arr){
    var result = 0;
    for (var i = 0; i < arr.length; i++){
        result += arr[i];

    }
return result;

}





console.log(addAllElements([1 ,2 , 3, 4, 5]) === 15)
console.log(addAllElements([1 ,2 , 3, 4, 5, 6]) === 21)
console.log(addAllElements([1 ,2 , 3,]) === 6)