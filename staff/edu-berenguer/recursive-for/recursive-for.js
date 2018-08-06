var numbers = [1, 2, 3];
var mul2 = [];
var count = 0;

function recursiveFor(numbers, callback) {
    // TODO implement a for-loop without for, but just recursion
    // if(numbers.length > 0){ 
    //     func(numbers.shift());
    //     return recursiveFor(numbers,func);
    // }

    // if(numbers.length !== mul2.length){
    //     callback(numbers[count]);
    //     count++;
    //     recursiveFor(numbers,callback);
    // }

    if(numbers.length){
        callback(numbers.shift());
        recursiveFor(numbers,callback);
    }
}