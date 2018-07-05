
function bingo(){ 
	var turns = 0;
	var playerName = null;

		function welcome(){
				turns = 0;
				if(playerName !== null){
					console.log("Welcome back to BINGO!");
					console.log(" ");
					
					newTurn(randomTable());
				}else{
					console.log("Welcome to BINGO!");
					console.log(" ");
					playerName = prompt("Please write your nickname!");

					newTurn(randomTable());

				}
		}
		function shuffle(a) {
		    for (let i = a.length - 1; i > 0; i--) {
		        const j = Math.floor(Math.random() * (i + 1));
		        [a[i], a[j]] = [a[j], a[i]];
		    }
		    return a;
		}
		function randomTable(){
			    var arr = [];
	    		var arrayNums = [];
	    		var num1 = 0,num2 = 0;

		    for(var i = 1; i < 20;i++){
		        arrayNums.push(i);

		    }
		    console.log(arrayNums);
		    arrayNums = shuffle(arrayNums);
		    console.log(arrayNums);

		   	var player = [
				[2,18,20,17,19],
				[12,11,4,16,9],
				[14,3,13,5,15]
			];

			var next = 0;
		    for (var i=0; i<3; i++) {
		    	for(var a = 0; a < player[i].length;a++){
		    		player[i][a] = arrayNums[next];
		    		next++;
		    	}

		    }

		    return player;
		}

		function randomNumber(){
			var min = 1;
	  		var max = 20;
	  		return Math.floor(Math.random() * (max - min + 1)) + min;//The maximum is inclusive and the minimum is inclusive 
		}

		function newTurn(player){
			var randomN = randomNumber();
			turns++;
			console.log("The Number of this turn is: "+randomN);
				//Comparar lineas con numero random
				for(var i = 0; i < player.length;i++){
					for(var a = 0; a < player[i].length;a++){
						if(player[i][a] === randomN){
							player[i][a] = 0;
						}
					}
				}

				//Comprobar si la linea esta completa	
				var completeLines = 0;
				for(var i = 0; i < player.length;i++){
					var line = true;
					for(var a = 0; a < player[i].length;a++){
						if(player[i][a] !== 0){
							line = false;
						}
					}
					if(line === true){
						console.log("Line "+(i+1)+" completada!");
						completeLines++;
					}
				}
				
				//Mostrar Lineas
				for(var i =0; i< player.length;i++){
					console.log("Line "+(i+1)+" : "+player[i].join(", "));
				}


				//Comprobar si ha ganado (completado las 3 lineas)
				if(completeLines === player.length){
					console.log("YOU WON!");
					endGame(turns);
				}else{
					askTurn(player,turns);
				}

		}

		function askTurn(player,turns){
			var question = confirm(playerName+" would you like to move to the next turn?");

			if(question === true){
				newTurn(player);

			}else{
				endGame(turns);
			}
		}

		function endGame(turns){
			console.log("You played "+turns+" turn/s.");

			var question = confirm(playerName+" would you like play another game?");

			if(question === true){
				welcome();

			}else{
				console.log("Good Bye "+playerName+" !");
			}
		}
	welcome();	

}

bingo();