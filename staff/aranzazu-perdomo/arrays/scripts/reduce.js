function reduce(array, func, init) {
       
       var accum = init;
       
       for (var i = 0; i < array.length; i++){
           
           accum =+ func(accum, array[i]);
           
           var sum = accum;
           var numberOfWordsWithL = accum;
           var total = accum;
           
       }
       
       return sum;
       return numberOfWordsWithL;
       return total;
   
   }