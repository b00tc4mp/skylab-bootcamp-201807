//m) Podrías mostrarlos en el orden inverso(el array del ejercicio 12)?
function Multiplication(Number){
	var Numbers=[1,2,3,4,5,6,7,8,9,10];

	var Result = Numbers.map(function(element){
		return element*Number;
	});
	return Result.reverse();
}


console.log(Multiplication(3));