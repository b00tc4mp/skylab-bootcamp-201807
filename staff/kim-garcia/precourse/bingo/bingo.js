//Mini-Proyecto del tema 3
//BINGO GAME! 🎲🎰
//Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. 
//Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), 
//para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número,
// si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará, 
//al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. 
//El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, 
//seguirá el mismo patrón que hasta el momento.

//Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", 
//pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

//Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. 
//Por último, deberá preguntar si desea volver a jugar.

//Hint:

//Empieza por la versión más básica!
//Why?:
//Comenzar por una versión muy pequeña y básica nos hará tener un programa de principio a fin, 
//es decir, que empieza, que acaba y haga lo que queramos a muy pequeña escala, 
//una vez lo tengamos todo bien dividido podremos empezar a extenderlo tanto como queramos.

//Si funciona con 5 números deberá funcionar con 15, no? 😁

//Requisitos de la versión mínima:
//Cartón con solo 5 números, sin necesidad de ser generados random.
// Solo necesitamos un número random cuando recorramos el cartón y veamos si hay alguna coincidencia.
// No necesitamos asegurarnos que el número random de cada turno no haya salido en turnos anteriores,
// recuerda que estamos en la mínima versión posible, eso ya lo solucionaremos.
// Si hay coincidencia, remplazaremos el número por una 'x' y mostramos el cartón modificado

//Sepáralo todo en funciones, englobado en una funcion global llamada bingo(), tal que:

//-Function! => Generar Numero Random Bombo

//-Function! => Nuevo turno (Match carton[i] === randomNum)

//-Function! => Preguntar Nuevo Turno


///////BINGO///////////////////////////////



		var carton = [] 
		var numDichos = []
		var linea1 = []
		var linea2 = []
		var linea3 = []
		var bingoGo = []

   
	function cartonRandom(){   //CARTON DE 15 NUMS RANDOMS CHECK
		var num = Math.floor(Math.random()*100+1)
		var comprobar = carton.indexOf(num)
		if(carton.length < 15){
			if(comprobar === -1){
				carton.push(num)
			}
		carton.sort()
		return cartonRandom()
		}
	}


	function welcome(){
		var name = prompt("¿Player name?")
		if(name != null){
			var date = new Date(); 
			var dayTime = date.toLocaleTimeString().substr(0,5); // toLocaleTimeString() = 14:56:14 
			if(dayTime < "12:00"){
				alert("Good morning " + name + ", let's play BINGO!")
			}else if((dayTime >= "12:00") || (dayTime < "20:00")) {
				alert("Good afternoon " + name + ", let's play BINGO!")
			}else if((dayTime >= "20:00") || (dayTime <= "06:00")){
				alert("Good evening " + name + ", let's play BINGO!")
			}
		} else {
			prompt("¿Name please?")
		}
	}

	
	function linea(){  // Hacer una matriz en vez de 3 array ?? algo mas simple

		if(carton.indexOf("X")<=4){
			linea1.push("0")
			carton.splice(carton.indexOf("X"), 1, "-")
		} else if((carton.indexOf("X")>=5)&&(carton.indexOf("X")<10)){
			linea2.push("0")
			carton.splice(carton.indexOf("X"), 1, "-")
		} else if((carton.indexOf("X")>=10)&&(carton.indexOf("X")<15)){
			linea3.push("0")
			carton.splice(carton.indexOf("X"), 1, "-")
		} 

		if(linea1.length === 5){
			alert("LINEA!")
			bingoGo.push("GO")
			linea1.push("yep") // para que el length sea 6
		} else if(linea2.length === 5){
			alert("LINEA!")
			bingoGo.push("GO")
			linea2.push("yup") 
		}else if(linea3.length === 5){
			alert("LINEA!")
			bingoGo.push("GO")
			linea3.push("yop")
		}

	}

////////////////tirada


function getRandom(){ //Num random del 0 al 2
	return Math.floor(Math.random()*100 +1)
}

function reciveRandom(){  	// tirada de un num del 1 al 100 sin repetir
	var newNum = getRandom()  // pilla un num random del 1 al 100
	if(numDichos.indexOf(newNum) === -1){ // si el indexOf del newNum (1-100) no exite (-1) 
		numDichos.push(newNum) 			 // pushea al array numDicho el newNum
		return newNum				// devuelve el newNum como resultado de la funcion
	} else {					// si el newNum existe en el array numDichos
		return reciveRandom()	// vuelve a llamar la funcion 
	}
}

function recorriendoCarton(){
	var salioEl = reciveRandom() // numero del 1 al 100 sin repetir
	for(var i=0; i<carton.length; i++){ // recorremos el array y miramos si coincide con el newNum
		if(carton[i] === salioEl){
			carton[i] = "X"
			linea()
		} 
	}
	console.log("Ha salido el numero "+salioEl+". Te quedan los siguientes numeros para BINGO: "+carton)
}


function bingo(){
	welcome() 
	cartonRandom()
	var tuCarton = confirm("TU CARTONCITO DE LA SUERTE ES EL SIGUIENTE: " + "\n" + carton + "\nDale a ACEPTAR para numero")
	do{ var tiro = confirm("NUMERO")
		recorriendoCarton()
		console.log(numDichos)
	}
	while(bingoGo.length < 3)
	var bingou = alert("!!BINGO!!")
	var fin = alert("Ganastes el BINGO con " + numDichos.length + " turnos.\n¿Deseas volver a probar suerte?")
}
bingo()
