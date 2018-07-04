//l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.
function Multiplication(Number){
	var Numbers=[1,2,3,4,5,6,7,8,9,10];

	var Result = Numbers.map(function(element){
		return element*Number;
	});
	return Result;
}


console.log(Multiplication(3));