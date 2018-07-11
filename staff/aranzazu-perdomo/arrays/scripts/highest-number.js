function highestNumber(numbers) {
  var max=numbers[0];
  for(var i=1; i<numbers.length ; i++){
        if(numbers[i] > max){
            max=numbers[i]
        }


  }
return max;




}