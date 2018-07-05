//m) Podrías mostrarlos en el orden inverso(el array del ejercicio 12)?
function multiplication(number){
	var numbers = [1,2,3,4,5,6,7,8,9,10];

	var result = numbers.map(function(element){
		return element*number;
	});
	return result.reverse();
}


console.log(multiplication(3));