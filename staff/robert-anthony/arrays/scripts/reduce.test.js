/*
function reduce(array, func, initial) {
  var accumulator = initial || 0;
  for (var i = 0; i < array.length; i++) {
    func(accumulator,array[i]);
  }
  return accumulator;
}
*/

var numbersArr = [1, 2, 3];
var stringsArr = ["hi", "there", "what"];

console.log(reduce(numbersArr, function (accumulator, current) {
  console.log(accumulator,current)
  return accumulator + current * 2
}, 0) === 12);


console.log(reduce(stringsArr, function (accumulator, current) {
  console.log(accumulator,current)
  return accumulator + " " + current.toUpperCase();
}, "Well yes,") === "Well yes, HI THERE WHAT");




