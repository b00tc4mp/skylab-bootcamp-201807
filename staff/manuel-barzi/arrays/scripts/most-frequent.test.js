// test 1

var numbers = [1, 2, 3, 4, 5, 2];

var most = mostFrequent(numbers);

console.log(most.length === 1);
console.log(most[0] === 2);

// test 2

var numbers = [1, 2, 3, 4, 5, 2, 1];

var most = mostFrequent(numbers);

console.log(most.length === 2);
console.log(most[0] === 1);
console.log(most[1] === 2);

