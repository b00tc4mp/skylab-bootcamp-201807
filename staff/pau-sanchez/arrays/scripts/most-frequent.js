function mostFrequent(array) {
    // returns and array with the most frequent elements
    var base = [];
    var frequent = [];


    for (var i = 0; i < array.length; i++){
       for (var j = 0; j < array.length; j++){
           if (array[i] === array[j] && array.indexOf(array[i]) !== j){
               if(frequent.indexOf(array[i]) === -1){
                frequent.push(array[i])
               }
                
           }
       }
    }

    
    return frequent;

}