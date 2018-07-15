function mostFrequent(array) {
   var arr= [];

   for (var i=0; i< array.length; i++){
       var flag=false;
       for(var j=0; j<array.length; j++){
           if(array[i]===array[j]&& !flag)
           arr.push(array[j]);
           flag=false;
       }
   }
    return arr;
}