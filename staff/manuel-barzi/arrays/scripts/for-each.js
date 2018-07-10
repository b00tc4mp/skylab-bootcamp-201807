function forEach(array, func) {
    // TODO implement a for-each (use of Array.prototype.forEach is forbidden)
    var word = "";
    for(var i = 0; i<array.length;i++){
        word = word+""+array;
    }
    console.log(word);
    return word;
}