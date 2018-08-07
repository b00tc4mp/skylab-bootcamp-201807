//With for: 
function _recursiveFor(numbers, func) {
    // TODO implement a for-loop without for, but just recursion
    for(var i = 0; i < numbers.length;i++ ){
        func(numbers[i])
    }
}
//Whitout for:
function recursiveFor(numbers, func, count) {
    // TODO implement a for-loop without for, but just recursion
    count = count || 0;
   if (count < numbers.length){
       func(numbers[count])
       recursiveFor(numbers, func, ++count);
   }
}

