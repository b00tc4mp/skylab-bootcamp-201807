// ?

var numbers = [1, 2, 3];
var mul2 = [];

recursiveFor(numbers, function(value) {
    mul2.push(value * 2);
});

assert('mul2 length is 3', mul2.length === 3);
assert('mul2 item 0 is 2', mul2[0] === 2);
assert('mul2 item 1 is 4', mul2[1] === 4);
assert('mul2 item 2 is 6', mul2[2] === 6);
