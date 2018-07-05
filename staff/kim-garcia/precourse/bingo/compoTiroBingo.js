// ESTE CODIGO FUNCIONA 

function Bingo(){
	var carton = [1, 2, 3, 5, 8, 13]
	var numRandom =  Math.floor(Math.random()*20)+1  // numero del 1 al 10
	var numDichos = []
	var linea1 = []
	var linea2 = []
	var linea3 = []
	// NO ES NECESARIO// var numeroCarton = carto[numRandom] // Aqui cogemos el numero random i seleccionamos un numero del array. check
function tirada(){
	for(var i=0; i < carton.length; i++){
		if(carton[i] === numRandom){
			numDichos.push(carton[i])
			carton[i] = "X"
			console.log(carton)
		}
	}
	console.log("Ha salido el numero " + numRandom + ". Te quedan estos numeros para BINGO " + carton) // con este for hacemos 1 tiro, si coincide se cambia el numero por una X
}

function linea(){  // Hacer una matriz en vez de 3 array ??
	if(linea1.length = 3){
		console.log("LINEA!")
	} else if(linea2.length = 3){
		console.log("LINEA!")
	}else if(linea3.length = 3){
		console.log("LINEA!")
	}

}



}
Bingo()

/// HASTA AQUI VA BENE

arrNew = []
var num = Math.floor(Math.random()*100)+1
if(arrNew.indexOf(num) != -1){
	arrNew.push(num)
} else {
	num = Math.floor(Math.random()*100)+1
}



var unoCien = [1, 2, 3, 4, 5, 6, 7, 8, 10] //hacer array aleatorio
var random = Math.floor(Math.random()*10)+1
var numRandom = unoCien[random]//Tenemos un nuermo de los del array unoCien
unoCien.splice(numRandom, 1, "Dicho") // Y lo substituimos por dicho



//WHILE
var unoCien = [1, 2, "dicho"] //acerlo aleatorio
var random = Math.floor(Math.random()*2)
var numRandom = unoCien[random]

do {
	random = Math.floor(Math.random()*3)
	numRandom = unoCien[random]
} while (typeof numRandom !== "number")

1	2	3	4	5	6	7	8	9	10
11	12	13	14	15	16	17	18	19	20
21	22	23	24	25	26	27	28	29	30
31	32	33	34	35	36	37	38	39	40
41	42	43	44	45	46	47	48	49	50
51	52	53	54	55	56	57	58	59	60
61	62	63	64	65	66	67	68	69	70
71	72	73	74	75	76	77	78	79	80
81	82	83	84	85	86	87	88	89	90
91	92	93	94	95	96	97	98	99	100


1, 2, 3, 4, 5, 6, 7, 8, 9, 10. 11, 12, 13, 14, 15, 16, 17, 18, 19, 20. 21, 22, 23, 24, 25, 26, 27, 28, 29, 30. 31, 32, 33, 34, 35, 36, 37, 38




	for(var i=0; i<carton.length; i++){
		for(var j=0; j<carton[i].length; i++){
			if((carton[i][j] === "X")&&(i<=2)){
				linea1.push(carton[i][j])
			} else if((carton[i][j] === "X")&&((i<2)&&(i<=5))){
				linea2.push(carton[i][j])
			} else if((carton[i][j] === "X")&&(i>5)){
				linea3.push(carton[i][j])
			}
		}
	}

console.log(linea1)
console.log(linea2)
console.log(linea3)
}
linea()



function tirada(){

	var carton = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 91, 93, 95, 97, 99]
	var numRandom =  Math.floor(Math.random()*100)+1  // numero del 1 al 10
	var numDichos = []

	if(numDichos.indexOf(numRandom) != -1){
		for(var i=0; i < carton.length; i++){
			if(carton[i] === numRandom){
				numDichos.push(carton[i])
				carton[i] = "X"
				console.log(carton)
			} else {
				numDichos.push(carton[i])
			}
		}
	} else {
		tirada()
	}
	console.log("Ha salido el numero " + numRandom + ". Te quedan estos numeros para BINGO " + carton) // con este for hacemos 1 tiro, si coincide se cambia el numero por una X
}

tirada()

	



	for(var i=0; i < carton.length; i++){
		if(carton[i] === numRandom){
			carton[i] = "X"
			console.log(carton)
		} 
	}
	console.log("Ha salido el numero " + numRandom + ". Te quedan estos numeros para BINGO " + carton) // con este for hacemos 1 tiro, si coincide se cambia el numero por una X
}



//////FINFINFINFIFNFIFN
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


function Bingo(){

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
	




	var carton = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 91, 93, 95, 97, 99] //acerlo aleatorio
	var unoCien = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10. 11, 12, 13, 14, 15, 16, 17, 18, 19, 20. 21, 22, 23, 24, 25, 26, 27, 28, 29, 30. 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,41, 42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100] //hacer array aleatorio de 100 nums


	function tirada(){

		var numDichos = []
		var random = Math.floor(Math.random()*99)
		var numRandom = unoCien[random]//Tenemos un nuermo de los del array unoCien

		do {	random = Math.floor(Math.random()*99)
				numRandom = unoCien[random]
		} while (typeof numRandom !== "number")

		for(var i=0; i < carton.length; i++){ //Tiramos
				if(carton[i] === numRandom){
					numDichos.push(carton[i])
					carton[i] = "X"
					console.log(carton)
					unoCien.splice(numRandom, 1, "Dicho")
				} else {
					numDichos.push(carton[i])
					unoCien.splice(numRandom, 1, "Dicho")
				}
			}
		console.log("Ha salido el numero " + numRandom + ". Te quedan estos numeros para BINGO " + carton) // con este for hacemos 1 tiro, si coincide se cambia el numero por una X
	}
	


	var bingo = []
	
function linea(){  // Hacer una matriz en vez de 3 array ??
	var linea1 = []
	var linea2 = []
	var linea3 = []

	if(carton.indexOf("X")<=4){
		linea1.push("0")
		carton.splice(carton.indexOf("X"), 1, "Y")
	} else if((carton.indexOf("X")>=5)&&(carton.indexOf("X")<10)){
		linea2.push("0")
		carton.splice(carton.indexOf("X"), 1, "Y")
	} else if((carton.indexOf("X")>=10)&&(carton.indexOf("X")<15)){
		linea3.push("0")
		carton.splice(carton.indexOf("X"), 1, "Y")
	} 

	if(linea1.length === 3){
		console.log("LINEA!")
		bingo.push("GO")
	} else if(linea2.length === 3){
		console.log("LINEA!")
		bingo.push("GO")
	}else if(linea3.length === 3){
		console.log("LINEA!")
		bingo.push("GO")
	}
}


function lookingForBingo(){
	welcome()
	do{
		tirada()
		linea()
	} while (bingo.length<3)
}
lookingForBingo()

}
Bingo()

//////////////


	var carton = [1, 2, 3, 5, 8, "X", 21, 34, 55, 89, 91, 93, 95, 97, 99] //acerlo aleatorio
	var unoCien = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,41, 42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100] //hacer array aleatorio de 100 nums
	var bingoGo = []
	
function linea(){  // Hacer una matriz en vez de 3 array ??
	var linea1 = []
	var linea2 = []
	var linea3 = []

	if(carton.indexOf("X")<=4){
		linea1.push("0")
		carton.splice(carton.indexOf("X"), 1, "Y")
	} else if((carton.indexOf("X")>=5)&&(carton.indexOf("X")<10)){
		linea2.push("0")
		carton.splice(carton.indexOf("X"), 1, "Y")
	} else if((carton.indexOf("X")>=10)&&(carton.indexOf("X")<15)){
		linea3.push("0")
		carton.splice(carton.indexOf("X"), 1, "Y")
	} 

	if(linea1.length === 3){
		console.log("LINEA!")
		bingoGo.push("GO")
	} else if(linea2.length === 3){
		console.log("LINEA!")
		bingoGo.push("GO")
	}else if(linea3.length === 3){
		console.log("LINEA!")
		bingGo.push("GO")
	}

	console.log(linea1)
	console.log(linea2)
	console.log(linea3)
	console.log(bingoGo)
	console.log(carton)
}
linea()



function isStillNum(currentValue) {
  return currentValue < 40;
}

var unoCien = [1, 30, 39, 29, 10, 13];

console.log(unoCien.every(isBelowThreshold));
// expected output: true


var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]



var carton = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 91, 93, 95, 97, 99] //hacerlo aleatorio
	var bingo = []
console.log(unoCien.includes(number))


	var unoCien = [93,94,"dicho"] //hacer array aleatorio de 100 nums

		do {	random = Math.floor(Math.random()*99)
				numRandom = unoCien[random]
				console.log(numRandom)
		} while (typeof numRandom !== 'number')

//BINGO

for(var i=0; i<unoCien.length;i++){
	if(typeof unoCien[i] == 'number'){
		tirada()
	}



var bingoGo = [1, 2, 3]
console.log(bingoGo.length)



var random = Math.floor(Math.random()*2)
var unoCien = [1, 2, 3]
var numRandom = unoCien[random]
unoCien.splice(numRandom, 1, "Dicho")
console.log(unoCien)




var random = Math.floor(Math.random()*99)
		var numRandom = unoCien[random]//Tenemos un nuermo de los del array unoCien
		numDichos.push(numRandom)

		do {	random = Math.floor(Math.random()*99)
				numRandom = unoCien[random]		
		} while (typeof numRandom !== "number")


		for(var i=0; i < carton.length; i++){ //Tiramos
				if(carton[i] === numRandom){
					carton[i] = "X"
					linea()
				} 
			}
		console.log("Ha salido el numero " + numRandom + ". Te quedan estos numeros para BINGO " + carton) // con este for hacemos 1 tiro, si coincide se cambia el numero por una X
		unoCien.splice(numRandom, 1, "Dicho")
	}

var random = Math.floor(Math.random()*99)
var numRandom = random * 2
console.log(random)
console.log(numRandom)


var arr = [1, 2, 3]
var dichos = []

function getRandom(){ //Num random del 0 al 2
	return Math.floor(Math.random()*3)
}

function reciveRandom(){ //cogemos la posicion getRandom del array 1 - 100
	var newNum = getRandom()
	var numeroSalido = arr[newNum]
	arr.splice(newNum, 1, "dicho")
	dichos.push(numeroSalido)
	return numeroSalido //nums del 1 al 3
}


////////////////tirada
var arr = [1, 2, 3]
var dichos = []

function getRandom(){ //Num random del 0 al 2
	return Math.floor(Math.random()*3)
}

function reciveRandom(){ //cogemos la posicion getRandom del array 1 - 100
	var newNum = getRandom()
	var numeroSalido = arr[newNum]
	dichos.push(numeroSalido)
	if(numeroSalido === "dicho"){
		reciveRandom()
	} else {
		arr.splice(newNum, 1, "dicho")	
	}
	console.log("Ha salido el numero "+numeroSalido+". Te quedan los siguientes numeros para BINGO: "+arr)
	return numeroSalido //nums del 1 al 3
}




/////////////////
///////////////// antigua tirada

		var random = Math.floor(Math.random()*99)
		var numRandom = unoCien[random]//Tenemos un nuermo de los del array unoCien

		do {	random = Math.floor(Math.random()*99)
				numRandom = unoCien[random]		
		} while (typeof numRandom !== "number")


		for(var i=0; i < carton.length; i++){ //Tiramos
				if(carton[i] === numRandom){
					carton[i] = "X"
					linea()
				} 
			}
		numDichos.push(numRandom)
		console.log("Ha salido el numero " + numRandom + ". Te quedan estos numeros para BINGO " + carton) // con este for hacemos 1 tiro, si coincide se cambia el numero por una X
		unoCien.splice(numRandom, 1, "Dicho")
	}
//////////////////////




var dichos = []
var carton = [2, 4, 3]
var random = Math.floor(Math.random()*3)
var numRandom = arr[random]
console.log(typeof numRandom)
console.log(numRandom)
if(typeof numRandom === 'number'){
	dichos.push(numRandom)
	for(var i=0; i<carton.length; i++){
		if(carton[i] === numRandom){
			carton[i] = "X"
			console.log("Linea()")
		}
	}
	arr.splice(arr[numRandom], 1, "dicho")
}
console.log(arr)


do {	random = Math.floor(Math.random()*3)
		numRandom = arr[random]		
		} while (typeof numRandom !== "number")



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

