function reduce(array, func, init) {
<<<<<<< HEAD
    var arr= [];
    for (var i=0; i<array.length-1; i++){
        if(i==array.length-1){
            arr.push(func(array[i]));

        }

    }
    return arr;
}
=======
       
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
>>>>>>> feature/new-folder-array
