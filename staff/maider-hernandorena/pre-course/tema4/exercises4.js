//a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), además, cada elemento de la pareja deberá estar multiplicada por 2.
function showNums(nums, mult){
    var pairs = nums.map(function(num){
       	return num + "ª pareja es " + num * mult + " - " + (num +1) * mult;
    })
    console.log(pairs);
}
showNums([1,2,3,4,5,6,7,8,9], 2);

//b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci?
function fibonacci(){
	var i;
	var fib = [];
	fib[0] = 0;
	fib[1] = 1;
	for(i=2; i<=10+1; i++){
        fib[i] = fib[i-2] + fib[i-1];
    	console.log(fib[i]);
	}
}
console.log(fibonacci()); // si en el bucle for pusieramos por ejemplo i<=1000+1, saldrían las primeras 1000 series

//b2) Puedes añadir además, la posición de cada resultado?
