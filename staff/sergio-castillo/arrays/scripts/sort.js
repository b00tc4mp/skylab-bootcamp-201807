function highestLetter(letters) {
    // TODO return the highest number found in numbers (use of Math max or min is forbidden)
    var numMax;
    if (letters.length>=1){
        letMax=letters[0];
        for(var i=0;i<letters.length;i++){
            if (letters[i]>letMax){
                letMax=letters[i];
            }
        }
    }
    return letMax;
}
console.log(highestLetter(['a','b','c']));


function sort(array, reverse) {
    // TODO return array sorted alphabetically / numerically (use of Array.prototype.sort is forbidden)
    var highestNum;
    var position;
    var newArray=[];
    while (array.length){
        highestNum=highestNumber(array);
        position=array.indexOf(highestNum);
        array.splice(position, 1);
        if(reverse===undefined){
            newArray.unshift(highestNum);
        }else{
            newArray.push (highestNum);
        }
    }
    return newArray;
}
