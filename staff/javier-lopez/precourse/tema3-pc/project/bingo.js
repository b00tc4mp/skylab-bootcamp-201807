function bingo(){
	var arrayNumber = [1,5,8,9,2,10,11];

	//Asking the name, if you don't write anything, you will be asked again for your Name.
	function askName(){
		var name = prompt("Introduce tu nombre de jugador: ");
		if(name){
			return name;
		}else{
			return askName();
		}
	}

	//Saying hello to the player
	console.log("Hola "+askName()+", estás iniciando el bingo");

	//Message
	console.log("Tus numeros del carton son los siguientes: "+arrayNumber.toString());

	//Generating the random ball(Number)
	function randomNumber(){
		var random = Math.floor((Math.random() * 15)+1);
		return random;
	}

	//Don't repeat the number generated
	function generateRandomBall(){
    
		var random = randomNumber();
		var genRandom = randomBall.indexOf(random);

		if (genRandom === -1) {
			randomBall.push(random);
			return random;
		} else {
			return generateRandomBall();
		}	

	}

	var randomBall = [];
	

	//Variable to see if we found all the numbers.
	var completed = 0;

	//Game
	function askTurn(){
		//Question for the user.
		var newNumber = confirm("Si quieres pedir una bola, pulsa aceptar. En caso contrario, pulsa cancelar para finalizar el juego");
		
	
		if(newNumber == true){
			console.log("Pidiendo un numero...");
			//Which number had the player?
			var random = randomNumber();

			console.log("El numero que te ha tocado es el: "+random);

			//Checking if the player has the number
			for(var i = 0;i<arrayNumber.length;i++){
				var check = arrayNumber.indexOf(random);
				if(check>-1){
					console.log("Bien! Ha coincidido con uno de los numeros del carton: "+arrayNumber.toString());
					completed++;
					arrayNumber[check] ="X";
					console.log("El carton queda de la siguiente manera: "+arrayNumber.toString());
					
					if (completed === arrayNumber.length) {
						return console.log("Bingo!!");
					}
				}
			}	
			return askTurn();
		}else{
			console.log("Juego finalizado");
		}
	}

	//Starting the game
	askTurn();
}

bingo();