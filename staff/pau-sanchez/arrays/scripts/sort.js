function sort(array, reverse) {
    // TODO return array sorted alphabetically 
    // numerically (use of Array.prototype.sort is forbidden)
    
    var baseArr = [];

    var bigArr = [array[0]];

    for (var i = array.length; i > 0; i--){
        for (var j = 0; j <= array.length; j++){
          if (reverse === undefined){  
            if (array[j] < bigArr[0]){
                bigArr.push(array[j]);
                bigArr.shift();
            }
         }else if(reverse === true){
            if (array[j] > bigArr[0]){
                bigArr.push(array[j]);
                bigArr.shift();
            }
         }
        }
        array.splice(array.indexOf(bigArr[0]),1);
        baseArr.push(bigArr[0]);
        bigArr = [array[0]];
        
    }
    
    
        
        return baseArr;
    }

    
