//CAMPO DE TIRO



   var questions = [ // esto es un array con todas las letras de pasapalabra
   	{letter: "a", answer: "anonadado", status: 0, question: ("CON LA A.  Asombrado, pasmado, maravillado, impresionado, alucinado, estupefacto, patidifuso")},
  	{letter: "b", answer: "Barcelona", status: 0, question: ("CON LA B. Barna, Barcino, Barca, Ciudad Condal")},
   	{letter: "c", answer: "Catalunya", status: 0, question: ("CON LA C. País casi independiente")},

   ]

 
var hits = []
var fails = []
var pasapalabra = []
var acc = 0

 function rosco(){
	questions.forEach(function(obj){ // recorre el array con forEach
			var myAnswer = prompt(obj.question) //creamos una respuesta que se guarda en answer
			if(myAnswer===obj.answer){  // comparamos myAnswer con el answer
				hits.push(obj.answer)
				console.log("Correcto! Tienes " + (acc += 1)+ " punto/s.")
				obj.status = 9
			} else if(myAnswer==="pasapalabra"){
				console.log("pasapalabra")
				pasapalabra.push(obj.answer) // no cal
			}else {
				console.log("¡INCORRECTO! La palabra que buscabamos era " + obj.answer )
				fails.push(obj.answer)
				obj.status = 9
			}
	})
	console.log("Hicistes un total de "+ hits.length + " aciertos y " + fails.length + " fallos. Gracias por participar.")

 }

rosco()

console.log(questions)


{letter: "d", answer: "datil", status: 0, question: ("CON LA D: Alimento para abrir el apetito durante el periodo de ramadan de los musulmanes.")},
{letter: "e", answer: "elefante", status: 0, question: ("CON LA E: Especie con el cerebro mas grande del reino animal.")},
{letter: "f", answer: "flaca", status: 0, question: ("CON LA F: Titulo de una cancion de Andres Calamaro.")},
{letter: "g", answer: "guacamole", status: 0, question: ("CON LA G: Salsa verde mejicana")},
{letter: "h", answer: "habano", status: 0, question: ("CON LA H: Un clasico entre los puros de fumar")},
{letter: "i", answer: "indio", status: 0, question: ("CON LA I: Nativo de America")},
{letter: "j", answer: "judias", status: 0, question: ("CON LA J: Poco queridas por Hitler pero magicas en las fabulas.")},
{letter: "k", answer: "Kim", status: 0, question: ("CON LA K: Sucesora de Steve Jobs")},
{letter: "l", answer: "luna", status: 0, question: ("CON LA L: Satelite que enloquece a los hombres por ciclos.")},
{letter: "m", answer: "mama", status: 0, question: ("CON LA M: Entra por los oidos y mueve todo el cuerpo.")},
{letter: "n", answer: "nata", status: 0, question: ("CON LA N: Deribado montable de la leche.")},
{letter: "o", answer: "ostion", status: 0, question: ("CON LA O: Lo que pasa cuando de emocionas en una bajada con un longboard y eres principiante.")},
{letter: "p", answer: "porque", status: 0, question: ("CON LA P: Lo que te debes preguntar para aprender.")},
{letter: "q", answer: "quita", status: 0, question: ("CON LA Q: Lo que le dices a un bicho.")},
{letter: "r", answer: "rincon", status: 0, question: ("CON LA R: El del vago era frecuentemente visitado en epoca escolar.")},
{letter: "s", answer: "silicon", status: 0, question: ("CON LA S, en ingles: En el 22@ de Barcelona encontramoes el nuevo valle, el resto se pasea delante de cada englobada mujer.")},
{letter: "t", answer: "tinder", status: 0, question: ("CON LA T: App con exito mundial que ayuda en las fases iniciales del apareamiento humano.")},
{letter: "u", answer: "utopia", status: 0, question: ("CON LA U: Plan o sistema ideal de gobierno en el que se concibe una sociedad perfecta y justa, donde todo discurre sin conflictos y en armonía.")},
{letter: "v", answer: "vaca", status: 0, question: ("CON LA V: Animal comun en los asados argentinos.")},
{letter: "w", answer: "wally", status: 0, question: ("CON LA W: Hombre que todo niño con una buena infancia ha buscado.")},
{letter: "x", answer: "xexos", status: 0, question: ("CON LA X: Comunmente conocidos los amigos de Kim")},
{letter: "y", answer: "ayahuasca", status: 0, question: ("CONTIENE LA Y: Alucinogeno amazonico que te lleva de viaje por el insconsciente.")},
{letter: "z", answer: "zoo", status: 0, question: ("CON LA Z: La típica con Z odiada por los animalistas.")},