//CALCULATOR
function calculator(){

	var sum = 0;
	var subs = 0;
	var mult = 1; 
	var div = new Number();
	var num = "";
	var count = 0;
	var flag = false;
	var answ  = "";

	function parameters(){
		sum = 0;
		subs = 0;
		mult = 1; 
		div = new Number();
		num = "";
		count = 0;
		flag = false;
		answ  = "";
		for(prop in arguments){
			sum += arguments[prop];
			subs -= arguments[prop];
			mult *= arguments[prop];
			//Asigno la primera posición en la división. Y partir de ahi realizar las siguientes diviones
			div = arguments[0];
			div /= arguments[prop];
			num += arguments[prop] + ",";
			count++;

			if(isNaN(arguments[prop] || count === 0)){
				flag = true;
			}

		}
		operations();
	}
	parameters(12,324,3);

	function question(){
		answ  = "";
		while(answ !== "s" && answ !== "n"){

		answ = prompt("Quieres seguir calculando s/n");
		}

		if(answ === "n"){
			console.log("Que tengas un buen dia");

		}if(answ === "s"){
			parameters(233,12,113,3);
		}
	}

	function operations(){

		if(count === 1 & flag === false){

			var root = Math.sqrt(sum);
			if(root % 1 != 0){
				root = root.toFixed(3);
			}
			console.log("La raíz cuadrada de " + sum + " es " + root);

		}else if(flag === false && count > 1) {

			if(sum % 1 !== 0 ){
				sum = sum.toFixed(3);
			}
			if(subs % 1 !== 0 ){
				subs = subs.toFixed(3);
			}
			if(mult % 1 !== 0 ){
				mult = mult.toFixed(3);
			}
			if(div % 1 !== 0 ){
				div = div.toFixed(3);
			}

			var results = [sum,subs,mult,div];
			for(var i = 0; i < results.length; i++){
				console.log("Con los números => " + num + 
					" tenemos de suma: " + sum + " ;de resta: " + subs +
					" de multiplicación: " + mult + " y de división: " + div);
				
			}question();
		}else{
			console.log("No has escrito un número");
		}
	}
	
}

calculator();
//DIFERENTES PRUEBAS
//Con un solo número => 
//calculator(23);

//Sin números => 
//calculator();

//Con un string =>
//calculator("prueba",12);







