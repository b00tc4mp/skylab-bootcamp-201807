// add all numbers

//console.log(addAllNumbers([1, 2, 3, 4, 5]) === 15); // true
//console.log(addAllNumbers([1, 2, 3, 4, 5, 6]) === 21); // true
//console.log(addAllNumbers([1, 2, 3]) === 6); // true

function addAllNumbers(numbers) {
    // TODO: implement using a standard loop (for or while, as you wish)
    var result = 0; // Declarem com a numero
    numbers.forEach(function(element) {
        result += element; // anem sumant, ja q hem definit result com a numero anteriorment. Si sigues string, realment concatenaria.
    });

    return result;
}