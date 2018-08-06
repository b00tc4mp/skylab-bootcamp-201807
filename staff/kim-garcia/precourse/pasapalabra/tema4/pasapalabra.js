Resource: https://www.youtube.com/watch?v=xJp2c_rcHDc

Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra
 y el usuario deberá adivinar que palabra estamos tratando, por ejemplo:

'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!
Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego,
 y habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha
  fallado y cuantas ha acertado. Si el usuario responde con "pasapalabra" el juego deberá 
  estar preparado para entender que en ese momento, el usuario no responderá esa pregunta,
   y no estará acertada ni fallada, la dejará para la siguiente ronda. El juego deberá,
    cuando finalize, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.


//varuestions = [
   // { lette   "a", answer: "abducir", status: 0, questio    "CON LA A. Dicho de una supuesta criatura
    // extraterrestre: Apoderarse de alguien") },
   // { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de 
    	//quicio a todos los 'Skylabers' en las sesiones de precurso") },
   // { letter: "c", 



   var questions = [ // esto es un array con todas las letras de pasapalabra
   	{letter: "a", answer: "anonadado", status: 0, question: ("CON LA A.  Asombrado, pasmado, maravillado, impresionado, alucinado, estupefacto, patidifuso")},
  	{letter: "b", answer: "Barcelona", status: 0, question: ("CON LA B. Barna, Barcino, Barca, Ciudad Condal")},
   	{letter: "c", answer: "Catalunya", status: 0, question: ("CON LA C. País casi independiente")},

   ]

 
var hits = []
var fails = []
var pasapalabra = []
var acc = 0
var ranking = []

function welcome(){
		var name = prompt("¿Player name?")
		if(name != null){
			var date = new Date(); 
			var dayTime = date.toLocaleTimeString().substr(0,5); // toLocaleTimeString() = 14:56:14 
			if(dayTime < "12:00"){
				alert("Good morning " + name + ", let's play PASAPALABRA!")
			}else if((dayTime >= "12:00") || (dayTime < "20:00")) {
				alert("Good afternoon " + name + ", let's play PASAPALABRA!")
			}else if((dayTime >= "20:00") || (dayTime <= "06:00")){
				alert("Good evening " + name + ", let's play PASAPALABRA!")
			}
		} else {
			prompt("¿Name please?")
		}
		return name
	}


 function rosco(){
	questions.forEach(function(obj){ // recorre el array con forEach
		var myAnswer = prompt(obj.question) //creamos una respuesta que se guarda en answer
		if(myAnswer===obj.answer){  // comparamos myAnswer con el answer
			hits.push(obj.answer)
			console.log("Correcto! Tienes " + (acc += 1)+ " punto/s.")
		} else if(myAnswer==="pasapalabra"){
			console.log("pasamos palabra")
			obj.status = 9
			pasapalabra.push(obj.answer) // no cal
		}else {
			console.log("¡INCORRECTO! La palabra que buscabamos era " + obj.answer )
			fails.push(obj.answer)
		}

	})
	console.log("Hicistes un total de "+ hits.length + " aciertos y " + fails.length + " fallos. Gracias por participar.")
 }


var jugador = welcome()
ranking.push(jugador + " con " + acc + " puntos")


rosco()

console.log(ranking)

console.log(questions)


