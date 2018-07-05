
//Function que llama a todas las funciones hijas del juego.
function bingo() {
	
	/*
	Function para preguntar el nombre al usuario, si no pone nada,
	llama la función de nuevo hasta que introduce algo
	*/

	function askName() {
		var userName = prompt("Como te llamas?");
		
		if (userName) {
			return userName;
		} else {
			return askName();
		}
	}

	//Imprimimos el saludo con el nombre
	console.log("Hola " + askName() + ", bienvenido al Bingo de Skylab");


	//Function para crear un número random del 1 al 15
	function generateRandomNumber() {
		return Math.floor((Math.random()*15)+1);
	}

	var random = generateRandomNumber();

	
	//Function para crear un cartón aleatorio con 6 numeros random
	function generateCartonRandom() {
		
		var emptyCarton = [];

		for (var i=0; i<6; i++) {
		
			var genRandom = emptyCarton.indexOf(random);
			
			if (genRandom === -1) {
				emptyCarton.push(random);
			} else {
				return generateCartonRandom();
			}	
		}

		return emptyCarton;
	}

	//Asignamos el resultado del carton lleno a una variable
	var carton = generateCartonRandom();


	
	
	//Function para crear una bola random que no se repita
	function generateBallRandom(){
    
		var genRandom = randomBall.indexOf(random);

		if (genRandom === -1) {
			randomBall.push(random);
			return random;
		} else {
			return generateBallRandom();
		}	

	}

	var randomBall = [];


	/*
	Variable donde vamos sumando por cada iteración que cumpla con el condicional,
	y así usarlo para poder retornar el console.log de Bingo
	*/
	var acc = 0;
	
	console.log("Este es tu cartón: " + carton);

	/*
	Function para preguntar al usuario si quiere sacar otra bola, esta function tambíen
	compara el cartón generado con la bola random y cuando hace un match entre los dos,
	cambia el numero por una X. Al final, cuando el acc se llena con cada iteración y entra
	en el condicional, canta bingo si se cumple o no.
	*/
	function askTurn() {
		
		var userResponse = confirm("Clica en aceptar para sacar una bola. Clica en cancelar si no quieres seguir jugando.");
		var random = generateBallRandom();;
		
		if (userResponse === true) {
			console.log("El..." + random);

			for (var i=0; i<carton.length; i++) {
				
				var match = carton.indexOf(random);
				
					if (match > -1) {
					acc++;
					carton[match] = "X";
					console.log("Encontrado el " + random + "!!");
					console.log(carton);

					if (acc === carton.length) {
						return console.log("Bingo!!");
					}
				}
			}
			
			return askTurn();
		
		} else {
			console.log("Adios");
		}
	}

	askTurn();
}

bingo();