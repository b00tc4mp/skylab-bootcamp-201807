function map(array, func) {
    // TODO implement a map (it should work same to Array.prototype.map, but accepting the array as a parameter. use of Array.prototoype.map is forbidden)
    var arr = []
    for (var i = 0; )

}


///FOR EACH
function forEach(array, func) {
    // TODO implement a for-each (use of Array.prototype.forEach is forbidden)
    var strings = []
    for (i = 0; i < array.length; i++ ){
       var num = func(array[i]);
       strings.push(num);
    }
    return strings
}

// test 1

var numbers = [1, 2, 3];

var strings = forEach(numbers, function(number) { return number.toString(); });

console.log(strings.length === 3);
console.log(strings[0] === '1');
console.log(strings[1] === '2');
console.log(strings[2] === '3');