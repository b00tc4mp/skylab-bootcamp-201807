Pasapalabra Game! (Final JS) video_gameinterrobang
Resource: https://www.youtube.com/watch?v=xJp2c_rcHDc

Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y 
el usuario deberá adivinar que palabra estamos tratando, por ejemplo:

'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!


Tu juego debería hacer una pregunta por cada letra del alfabeto, 
al final del juego, y habiendo respondido todas las letras, 
deberá indicarle al usuario cuantas letras ha fallado y cuantas ha acertado.


Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento, 
el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. 

El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.




var questions1stPlayer = [
    { letter: "a", answer: "abducir", pending: true, status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", pending: true, status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", pending: true, status: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", pending: true, status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", pending: true, status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", pending: true, status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", pending: true, status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", pending: true, status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", pending: true, status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", pending: true, status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", pending: true, status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", pending: true, status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", pending: true, status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", pending: true, status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", pending: true, status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", pending: true, status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", pending: true, status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", pending: true, status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", pending: true, status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", pending: true, status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", pending: true, status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", pending: true, status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", pending: true, status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", pending: true, status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", pending: true, status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", pending: true, status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]

var questions2ndPlayer = [
    { letter: "a", answer: "abastecer", pending: true, status: 0, question: ("CON LA A. Proveer a alguien o a algo de bastimentos, víveres u otras cosas necesarias") },
    { letter: "b", answer: "bacanal", pending: true, status: 0, question: ("CON LA B. Dicho de ciertas fiestas de la Antigüedad: Celebradas en honor del dios Baco") },
    { letter: "c", answer: "caballo", pending: true, status: 0, question: ("CON LA C. Mamífero solípedo del orden de los perisodáctilos, de tamaño grande y extremidades largas.") },
    { letter: "d", answer: "dársena", pending: true, status: 0, question: ("CON LA D. Parte de un puerto resguardada artificialmente y adecuada para el fondeo y la carga y descarga de embarcaciones.") },
    { letter: "e", answer: "echar", pending: true, status: 0, question: ("CON LA E. Hacer que algo vaya a parar a alguna parte, dándole impulso") },
    { letter: "f", answer: "fabada", pending: true, status: 0, question: ("CON LA F. Potaje de judías con tocino, chorizo y morcilla, típico de Asturias.") },
    { letter: "g", answer: "gala", pending: true, status: 0, question: ("CON LA G. Vestido sobresaliente y lucido.") },
    { letter: "h", answer: "hambre", pending: true, status: 0, question: ("CON LA H. Gana y necesidad de comer.") },
    { letter: "i", answer: "idioma", pending: true, status: 0, question: ("CON LA I. Lengua de un pueblo o nación, o común a varios.") },
    { letter: "j", answer: "jabonar", pending: true, status: 0, question: ("CON LA J. Fregar o estregar la ropa u otras cosas con jabón y agua para lavarlas, emblanquecerlas o ablandarlas.") },
    { letter: "k", answer: "bikini", pending: true, status: 0, question: ("CONTIENE LA K. Prenda femenina de baño compuesta de un sujetador y una braga.") },
    { letter: "l", answer: "lagar", pending: true, status: 0, question: ("CON LA L. Recipiente donde se pisa la uva para obtener el mosto.") },
    { letter: "m", answer: "macuto", pending: true, status: 0, question: ("CON LA M. Mochila, especialmente la del soldado.") },
    { letter: "n", answer: "nacer", pending: true, status: 0, question: ("CON LA N. Dicho de un ser vivo: Salir del vientre materno, del huevo o de la semilla.") },
    { letter: "ñ", answer: "acompañar", pending: true, status: 0, question: ("CONTIENE LA Ñ. Estar o ir en compañía de otra u otras personas.") },
    { letter: "o", answer: "obra", pending: true, status: 0, question: ("CON LA O. Cosa hecha o producida por un agente.") },
    { letter: "p", answer: "padre", pending: true, status: 0, question: ("CON LA P. Varón o animal macho que ha engendrado a otro ser de su misma especie.") },
    { letter: "q", answer: "queja", pending: true, status: 0, question: ("CON LA Q. Expresión de dolor, pena o sentimiento.") },
    { letter: "r", answer: "rabo", pending: true, status: 0, question: ("CON LA R. Cosa que cuelga a semejanza de la cola de un animal.") },
    { letter: "s", answer: "sablazo", pending: true, status: 0, question: ("CON LA S. Acto de sacar dinero a alguien pidiéndoselo, por lo general, con habilidad o insistencia y sin intención de devolverlo.") },
    { letter: "t", answer: "tabú", pending: true, status: 0, question: ("CON LA T. Condición de las personas, instituciones y cosas a las que no es lícito censurar o mencionar.") },
    { letter: "u", answer: "ubicar", pending: true, status: 0, question: ("CON LA U. Situar o instalar en determinado espacio o lugar.") },
    { letter: "v", answer: "vaciar", pending: true, status: 0, question: ("CON LA V. Dejar vacío algo.") },
    { letter: "w", answer: "clown", pending: true, status: 0, question: ("CONTIENE LA W. Payaso de circo, y especialmente el que, con aires de afectación y seriedad, forma pareja con el augusto.") },
    { letter: "x", answer: "conexión", pending: true, status: 0, question: ("CONTIENE LA X. Enlace, atadura, trabazón, concatenación de una cosa con otra.") },
    { letter: "y", answer: "yen", pending: true, status: 0, question: ("CON LA Y. Unidad monetaria del Japón.") },
    { letter: "z", answer: "zamarra", pending: true, status: 0, question: ("CON LA Z. Prenda de vestir, rústica, hecha de piel con su lana o pelo.") },
]

	//status == 0 ==> no preguntado;
	//status == 1 ==> pasapalabra;
	//status == 2 ==> fail;
	//status == 3 ==> acertado;

var name1stPlayer = "";
var name2ndPlayer = "";	



function askNames(){
	name1stPlayer = prompt("Como se llama el primer jugador?");
	name2ndPlayer = prompt("Como se llama el segundo jugador?");

};


		var pending1stplayer = function (){
		for (var i = 0; i < questions1stPlayer.length; i++){
			if (questions1stPlayer[i].pending == true){
				return true;
			} else {
				return false;
				}
			}
		}

		var pending2ndplayer = function (){
			for (var i = 0; i < questions2ndPlayer.length; i++){
				if (questions2ndPlayer[i].pending == true){
					return true;
				} else {
			return false;
				}
			}
		}



var questionsplayer = "";
var namePlayer = "";

function chooseTurnAndPlayer(){


	

	alert("Escojemos jugador "+namePlayer)
	if (questions1stPlayer[0].pending === true){
		questions = questions1stPlayer;
		namePlayer = name1stPlayer;
	} else if (namePlayer == name1stPlayer){// && pending2ndplayer == true){ //1st player was playing && 2nd player has pending questions ==> Change to 2nd Player
		questions = questions2ndPlayer;
		namePlayer = name2ndPlayer;
	} else if (namePlayer == name2ndPlayer){// && pending1stplayer == true){ //2nd player was playing && 1st player has pending questions ==> Change to 1st Player
		questions = questions1stPlayer;
		namePlayer = name1stPlayer;
	} 
	/*
	else if (namePlayer == name1stPlayer){// && pending2ndplayer == false){ //1st player was playing && 2nd player DOESNT have pending questions ==> Continue 1st Player
		questions = questions1stPlayer;
		namePlayer = name1stPlayer;
	} else if (namePlayer == name2ndPlayer){// && pending1stplayer == false){ //2nd player was playing && 1st player DOESNT have pending questions ==> Continue 2nd Player
		questions = questions2ndPlayer;
		namePlayer = name2ndPlayer;
	}*/
	alert("Es tu turno "+namePlayer)
	
	askingPlayer(namePlayer,questions);
}


function askingPlayer(name,questions){
	alert("Empezamos "+name);
	for (var i = 0; i < questions.length; i++){
		if (questions[i].status == 0 || questions[i].status == 1 ){//no preguntado o preguntado
			var playerAnswer = "";
			playerAnswer = prompt(name+"! "+questions[i].question,"Pista: "+questions[i].answer);
			if (playerAnswer == questions[i].answer){
				questions[i].status = 3;
				questions[i].pending = false;
				alert("Correcto!");
			} else if (playerAnswer === null){
				chooseTurnAndPlayer(name);
			} else if (playerAnswer == "pasapalabra"){
				questions[i].status = 1;
				questions[i].pending = true;
				alert("Has dicho pasapalabra!")
				chooseTurnAndPlayer(name);
			} else if (playerAnswer !== questions[i].answer){
				questions[i].status = 2;
				questions[i].pending = false;
				alert("Oooooh! es incorrecto!");
				chooseTurnAndPlayer(name);
			 }
	} else {
		chooseTurnAndPlayer(name);
	}
	alert("BREAK!")
	playerAnswer = "";
	chooseTurnAndPlayer(name)
}

function pasapalabra(){
	askNames();
    /*chooseTurnAndPlayer()*/
}




pasapalabra();

