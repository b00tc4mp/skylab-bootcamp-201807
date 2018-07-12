
function forEach(array,func) {

  for (var i=0; i<array.length; i++){
    func(array[i],i, array);
  }
  return array;
}