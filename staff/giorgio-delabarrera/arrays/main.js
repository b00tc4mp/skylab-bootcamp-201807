
console.log(addAllElements([1, 2, 3, 4, 5]) === 15);    // => true

console.log(addAllElements([1, 2, 3, 4, 5, 6]) === 21);    // => true

console.log(addAllElements([1, 2, 3]) === 6);    // => true

function addAllElements(numbers) {
    var res = 0;
    numbers.forEach(function(number) {
        res += number;
    });
    return res;
}

