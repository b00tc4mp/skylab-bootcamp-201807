/*BINGO GAME! 🎲🎰
Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse.
Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), 
para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número, 
si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. 
El cartón se mostrará, al final de cada turno, con los cambios efectuados, 
indicándole al usuario qué número se ha encontrado. 
El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, 
seguirá el mismo patrón que hasta el momento.
Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!",
pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".
Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. Por último, deberá preguntar si desea volver a jugar.*/

/*Cartón con solo 5 números, sin necesidad de ser generados random. 
Solo necesitamos un número random cuando recorramos el cartón y veamos si hay alguna coincidencia. 
No necesitamos asegurarnos que el número random de cada turno no haya salido en turnos anteriores, 
recuerda que estamos en la mínima versión posible, eso ya lo solucionaremos. Si hay coincidencia, 
remplazaremos el número por una 'x' y mostramos el cartón modificado*/





//Creem cartro
function crearCarton(carton){
	for (var i=0; i<15; i++){
		carton[i]=((Math.random()*99)+1).toFixed();
	}	
}

//si hi ha numero repetit canviem per X
function arreglarCarton(carton){
	for( var i=0; i<15; i++){
		for (var j=0; j<15; j++){
			if( i!=j){
				if (carton[i]==carton[j]){
					carton[j]='X';
				}
			}
		}
	}
}


//Crear numero del bombo
function random() {
	return ((Math.random()*99)+1).toFixed();
}

//mirem si hi ha un numero igual que al que surt del bombo
function turno(num,rand){
		for (i=0; i<15; i++){
			if (rand === num[i]){
				num[i]='X';
				//return puntuacio = puntuacio + 10;
			} else {
				//return puntuacio = puntuacio -1;
		
		}
}


/*function ranking(punts, puntuacio, nom){
	for (elem in punts){
		if (puntuacio>elem){
				punts.push(puntuacio + " " + nom);	
		}
	}
	punts.sort();
	var n=1;
	for (elem in punts){
		console.log (n + " " + punts);
	}
}*/


 function mirarBingo(carton){
	var cnt=0;
	for (var i=0; i<15; i++){
		if (carton[i]=="X"){
			cnt++;
		}
	}
	if (cnt==15){
		return true;
	} else{
		return false;
	}
}


function bingo(){
		//var puntuacio=100;
		//crear array carton
		var carton = new Array(15);
		//crear array puntuacion
		var punts = new Array(10);
		
		
		//nom
		var nom = prompt ("Bienvenido, como te llamas?");
		//decidir carton
		var exit=1;
		while (exit==1){
				crearCarton(carton);
				arreglarCarton(carton);
				console.log(carton);
				var answer = prompt ("te gusta el carton");
				if (answer == "yes" ){
					exit=0;
				} else{
					//answer == no
					exit = 1;
				}
		}
		console.log ("carton :\n" +  carton);
	
		//bingo y turnos
		var finish=1;
		while (finish==1){
				var bingowhat = mirarBingo(carton);
				if ( bingo == true){
					//puntuacio= puntuacio+1000;
					finish=0;
				} else {
					//bingo==false
					var newturn= prompt ("Quieres sacar un nuevo numero?");
					if (newturn =="yes"){
						//puntuacio = puntuacio -1;
						var rand=random();
						finsih=1;
						//puntuacio = puntuacio + turno(carton,rand, puntuacio);
						turno(carton,rand);
						console.log ("El numero es:" + rand + "\n Tu carton queda asi: " + carton);
					} else {
						finish=0;
					}
				}
				//console.log ("La teva puntuacio es :" + puntuacio);
		}
		//mostrar ranking
		//ranking (punts, puntuacio, nom);
		
		
}



}
