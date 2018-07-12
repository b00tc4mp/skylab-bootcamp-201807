// add all elements
function addAllElements(arr) {
    return arr.reduce(function(a,b){return a+b;});
    // var sum=0;
    // for(var i=0; i<arr.length; i++)
    //     sum+=arr[i];
    // return sum;
}
console.log(addAllElements([1,2,3,4,5])===15); // > true
console.log(addAllElements([1,2,3,4,5,6])===21); // > true
console.log(addAllElements([1,2,3])===6); // > true

var a = [1, 2, "hola"];
console.log(addAllElements(a));