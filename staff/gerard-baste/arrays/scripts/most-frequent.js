function mostFrequent(array) {
    // returns and array with the most frequent elements
    var numberArray = []

    for (var i = 0; i < array.length; i++) {
        for (var j = i+1; j < array.length; j++) {
            if(array[i] === array[j]){
                numberArray.push(array[j]);
            }
        }
    }
    return numberArray;
}


// var numbers = [1, 2, 3, 4, 5, 2];

// var most = mostFrequent(numbers);

// console.log(most.length === 1);
// console.log(most[0] === 2);