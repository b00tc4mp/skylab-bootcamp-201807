
function sort(array, reverse) {
        // TODO return array sorted alphabetically 
        // numerically (use of Array.prototype.sort is forbidden)
        
        var arrayA = [];
    
        var arrayB = [array[0]];
    
        for (var i = array.length; i > 0; i--){
            for (var j = 0; j <= array.length; j++){
              if (reverse === undefined){  
                if (array[j] < arrayB[0]){
                    arrayB.push(array[j]);
                    arrayB.shift();
                }
             }else if(reverse === true){
                if (array[j] > arrayB[0]){
                    arrayB.push(array[j]);
                    arrayB.shift();
                }
             }
            }
            array.splice(array.indexOf(arrayB[0]),1);
            arrayA.push(arrayB[0]);
            arrayB = [array[0]];
            
        }
        
        
            
            return arrayA;
        }