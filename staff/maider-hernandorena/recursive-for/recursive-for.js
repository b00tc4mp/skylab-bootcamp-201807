var numbers = [1, 2, 3];
var mul2 = [];
var count = 0;

function recursiveFor(numbers, fun) {
    // TODO implement a for-loop without for, but just recursion
    if (mul2.length != 3) {
        fun(numbers[count]);
        count++
        recursiveFor(numbers, fun);
    } 
        console.log(mul2);
};