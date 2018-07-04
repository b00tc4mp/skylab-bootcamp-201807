//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.
var Numbers=[1,2,3,4,5,6,7,8,9,10];

var Double = Numbers.map(function(element){
	return element*2;
});

console.log(Double);