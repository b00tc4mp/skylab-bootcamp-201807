function mostFrequent(array) {
    // returns and array with the most frequent elements
    var repeatCharacters=[];
    for (var i=0; i<array.length;i++){
        var char=array[i];
        var count=0;
        for (var a=0;a<array.length;a++){
            if(char===array[a]){
                count++;
            }
        }
        if ((count>1)&&(repeatCharacters.indexOf(char)===-1)){
            repeatCharacters.push(char);
        }
    }
    return repeatCharacters;
}

