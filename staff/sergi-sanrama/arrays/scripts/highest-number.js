//console.log(highestNumber([1, 5, 2, 10, 3]) === 10);
//console.log(highestNumber([]) === undefined);
//console.log(highestNumber([1, 5, 2, 1, 3, 5]) === 5);
//console.log(highestNumber([1, 5, 2, undefined, 13, 'a', '$']) === 13);

function highestNumber(numbers) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    
    if (numbers.length === 0){
        return undefined
       
    }else{debugger;}
    var numMax = 0;
    for (var i = 0; i < numbers.length; i++){
        var num = numbers[i];
        if(numMax < num ){
            numMax = num;
        }

    }
    return numMax;
}