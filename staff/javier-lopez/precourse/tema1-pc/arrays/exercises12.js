//l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.
function multiplication(number){
	var numbers = [1,2,3,4,5,6,7,8,9,10];

	var result = numbers.map(function(element){
		return element*number;
	});
	return result;
}


console.log(multiplication(3));