// for-each

function forEach(array, handler) {
    for (var i = 0; i < array.length; i++) {
        var value = array[i];

        handler(value);
    }
}

var arr = [1, 2, 3];

forEach(arr, function(value) {
    console.log(value);
});

// output:
// 1
// 2
// 3

var res = 0;

forEach(arr, function(value) {
    res += value; 
});

console.log(res);

// output:
// 6

// 