Realiza un programa que simule un Bingo. 
==>Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. 
==>Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), 
para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número, 
si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. 
El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. 
El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, 
en caso de que se continúe, seguirá el mismo patrón que hasta el momento.

Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", 
pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. 

Por último, deberá preguntar si desea volver a jugar.

==>Cartón con solo 5 números, sin necesidad de ser generados random. 
==>Solo necesitamos un número random cuando recorramos el cartón y veamos si hay alguna coincidencia. 
==>No necesitamos asegurarnos que el número random de cada turno no haya salido en turnos anteriores, 
recuerda que estamos en la mínima versión posible, eso ya lo solucionaremos. 
==>Si hay coincidencia, remplazaremos el número por una 'x' y mostramos el cartón modificado

Sepáralo todo en funciones, englobado en una funcion global llamada bingo(), tal que:

-Function! => Generar Numero Random Bombo

-Function! => Nuevo turno (Match carton[i] === randomNum)

-Function! => Preguntar Nuevo Turno


var nombre = "";

function preguntarNombre(){
	nombre = prompt("Como te llamas?");
}


var numeros = 25;

function randomGen(){
		return Math.floor((Math.random() * numeros) + 1)
}


var carton = {
			arr1 : [],
			arr2 : [],
			arr3 : []
		}

function creaCarton(){
		
		var nosirve = [];
		
		for (var i = 0; i <= numeros; i++){
			var nu = randomGen();
			if (carton.arr1.indexOf(nu) == - 1 && carton.arr1.length < 5){
				carton.arr1.push(nu);
			}
			else {nosirve.push(nu);}
		}
		for (var i = 0; i <= numeros; i++){
			var nu = randomGen();
			if (carton.arr1.indexOf(nu) == - 1 && carton.arr2.indexOf(nu) == - 1 && carton.arr2.length < 5){
				carton.arr2.push(nu);
			}
			else {nosirve.push(nu);}
		}
		for (var i = 0; i <= numeros; i++){
			var nu = randomGen();
			if (carton.arr1.indexOf(nu) == - 1 && carton.arr2.indexOf(nu) == - 1 && carton.arr3.indexOf(nu) == - 1 && carton.arr3.length < 5){
				carton.arr3.push(nu);
			}
			else {nosirve.push(nu);}
		}

	
		console.log(carton);
		
		
	}


var contador = 0;


function buscar(){
	
	var turno = randomGen();


	console.log("El "+turno+"!");

	
	
	if (carton.arr1.indexOf(turno) == -1 && carton.arr2.indexOf(turno) == -1 && carton.arr3.indexOf(turno) == -1){
		alert ("No tienes el "+turno+" :("+ "\n" +carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
		console.log(carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
		contador++;
	}

	else if (carton.arr1.indexOf(turno) != -1){
		carton.arr1[carton.arr1.indexOf(turno)] = 0;
		alert ("Tienes el "+ turno + "!"+ "\n" +carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
			
		console.log(carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
		contador++;
	}
	else if (carton.arr2.indexOf(turno) != -1){
		carton.arr2[carton.arr2.indexOf(turno)] = 0;
		alert ("Tienes el "+ turno + "!"+ "\n" +carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
			
		console.log(carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
		contador++;
	}
	else {
		carton.arr3[carton.arr3.indexOf(turno)] = 0;
		alert ("Tienes el "+ turno + "!"+ "\n" +carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
			
		console.log(carton.arr1+ "\n" +carton.arr2+ "\n" +carton.arr3);
		contador++;
	}

	compruebaLinea();


};

function compruebaBingo(){
	if (carton.arr1 === "Línea" && carton.arr2 === "Línea" && carton.arr3 === "Línea"){
			alert(nombre+" has conseguido BINGO en "+contador+" turnos");
			startagain();

	}else{jugarOtraVez();}
}


function compruebaLinea(){
	

	if (carton.arr1[0] === 0 && carton.arr1[1] === 0 && carton.arr1[2] === 0 && carton.arr1[3] === 0 && carton.arr1[4] === 0){
			alert(nombre+" has conseguido LINEA en "+contador+" turnos");
			carton.arr1 = "Línea";
			compruebaBingo();
			}
	else if (carton.arr2[0] === 0 && carton.arr2[1] === 0  && carton.arr2[2] === 0  && carton.arr2[3] === 0  && carton.arr2[4] === 0 ){
			alert(nombre+" has conseguido LINEA en "+contador+" turnos");
			carton.arr2 = "Línea";
			compruebaBingo();
			}
	else if (carton.arr3[0] === 0 && carton.arr3[1] === 0  && carton.arr3[2] === 0  && carton.arr3[3] === 0  && carton.arr3[4] === 0 ){
			alert(nombre+" has conseguido LINEA en "+contador+" turnos");
			carton.arr3 = "Línea";
			compruebaBingo();
			}
	else {jugarOtraVez();}

}

function jugarOtraVez(){
	if (confirm("Siguiente turno?")) {
    buscar();
	} else {
    txt = "Se acabó";
	}
}

function startagain(){
	if (confirm(nombre+" quieres volver a jugar?")) {
	carton.arr1 = [];
	carton.arr2 = [];
	carton.arr3 = [];	
    bingo();
	} else {
    txt = "Se acabó";
	}
}


function bingo(){
	preguntarNombre();
	creaCarton()
	buscar();
}

bingo();

