
var questions1stPlayer = [
    //push here{ name: name1stPlayer, cycle1stPlayer: ...}
    { letter: "a", answer: "abducir", status: 0, cycle: 1, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, cycle: 1, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, cycle: 1, round: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, cycle: 1, round: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, cycle: 1, round: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, cycle: 1, round: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, cycle: 1, round: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, cycle: 1, round: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, cycle: 1, round: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, cycle: 1, round: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, cycle: 1, round: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, cycle: 1, round: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, cycle: 1, round: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, cycle: 1, round: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, cycle: 1, round: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, cycle: 1, round: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, cycle: 1, round: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, cycle: 1, round: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, cycle: 1, round: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, cycle: 1, round: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, cycle: 1, round: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, cycle: 1, round: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, cycle: 1, round: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]


var questions2ndPlayer = [
    
    { letter: "a", answer: "abastecer", status: 0, cycle: 1, round: 0, question: ("CON LA A. Proveer a alguien o a algo de bastimentos, víveres u otras cosas necesarias") },
    { letter: "b", answer: "bacanal", status: 0, cycle: 1, round: 0, question: ("CON LA B. Dicho de ciertas fiestas de la Antigüedad: Celebradas en honor del dios Baco") },
    { letter: "c", answer: "caballo", status: 0, cycle: 1, round: 0, question: ("CON LA C. Mamífero solípedo del orden de los perisodáctilos, de tamaño grande y extremidades largas.") },
    { letter: "d", answer: "dársena", status: 0, cycle: 1, round: 0, question: ("CON LA D. Parte de un puerto resguardada artificialmente y adecuada para el fondeo y la carga y descarga de embarcaciones.") },
    { letter: "e", answer: "echar", status: 0, cycle: 1, round: 0, question: ("CON LA E. Hacer que algo vaya a parar a alguna parte, dándole impulso") },
    { letter: "f", answer: "fabada", status: 0, cycle: 1, round: 0, question: ("CON LA F. Potaje de judías con tocino, chorizo y morcilla, típico de Asturias.") },
    { letter: "g", answer: "gala", status: 0, cycle: 1, round: 0, question: ("CON LA G. Vestido sobresaliente y lucido.") },
    { letter: "h", answer: "hambre", status: 0, cycle: 1, round: 0, question: ("CON LA H. Gana y necesidad de comer.") },
    { letter: "i", answer: "idioma", status: 0, cycle: 1, round: 0, question: ("CON LA I. Lengua de un pueblo o nación, o común a varios.") },
    { letter: "j", answer: "jabonar", status: 0, cycle: 1, round: 0, question: ("CON LA J. Fregar o estregar la ropa u otras cosas con jabón y agua para lavarlas, emblanquecerlas o ablandarlas.") },
    { letter: "k", answer: "bikini", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA K. Prenda femenina de baño compuesta de un sujetador y una braga.") },
    { letter: "l", answer: "lagar", status: 0, cycle: 1, round: 0, question: ("CON LA L. Recipiente donde se pisa la uva para obtener el mosto.") },
    { letter: "m", answer: "macuto", status: 0, cycle: 1, round: 0, question: ("CON LA M. Mochila, especialmente la del soldado.") },
    { letter: "n", answer: "nacer", status: 0, cycle: 1, round: 0, question: ("CON LA N. Dicho de un ser vivo: Salir del vientre materno, del huevo o de la semilla.") },
    { letter: "ñ", answer: "acompañar", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA Ñ. Estar o ir en compañía de otra u otras personas.") },
    { letter: "o", answer: "obra", status: 0, cycle: 1, round: 0, question: ("CON LA O. Cosa hecha o producida por un agente.") },
    { letter: "p", answer: "padre", status: 0, cycle: 1, round: 0, question: ("CON LA P. Varón o animal macho que ha engendrado a otro ser de su misma especie.") },
    { letter: "q", answer: "queja", status: 0, cycle: 1, round: 0, question: ("CON LA Q. Expresión de dolor, pena o sentimiento.") },
    { letter: "r", answer: "rabo", status: 0, cycle: 1, round: 0, question: ("CON LA R. Cosa que cuelga a semejanza de la cola de un animal.") },
    { letter: "s", answer: "sablazo", status: 0, cycle: 1, round: 0, question: ("CON LA S. Acto de sacar dinero a alguien pidiéndoselo, por lo general, con habilidad o insistencia y sin intención de devolverlo.") },
    { letter: "t", answer: "tabú", status: 0, cycle: 1, round: 0, question: ("CON LA T. Condición de las personas, instituciones y cosas a las que no es lícito censurar o mencionar.") },
    { letter: "u", answer: "ubicar", status: 0, cycle: 1, round: 0, question: ("CON LA U. Situar o instalar en determinado espacio o lugar.") },
    { letter: "v", answer: "vaciar", status: 0, cycle: 1, round: 0, question: ("CON LA V. Dejar vacío algo.") },
    { letter: "w", answer: "clown", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA W. Payaso de circo, y especialmente el que, con aires de afectación y seriedad, forma pareja con el augusto.") },
    { letter: "x", answer: "conexión", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA X. Enlace, atadura, trabazón, concatenación de una cosa con otra.") },
    { letter: "y", answer: "yen", status: 0, cycle: 1, round: 0, question: ("CON LA Y. Unidad monetaria del Japón.") },
    { letter: "z", answer: "zamarra", status: 0, cycle: 1, round: 0, question: ("CON LA Z. Prenda de vestir, rústica, hecha de piel con su lana o pelo.") },
]


	//status == 0 ==> not asked;
	//status == 1 ==> pasapalabra;
	//status == 2 ==> fail;
	//status == 3 ==> right;


/*BEGINNING OF INTRO GAME*/

function startUp() {
	document.getElementById("startButton").style.display = "none";
	document.getElementById("idTitle").style.display = "block";
	document.getElementById("idTitle2").style.display = "block";

}

function fuckingName1(){
	var el = document.getElementById("idTitle");
	var newEl = document.createElement('p');
	newEl.innerHTML = document.getElementById("idNombre1").value;
	var name1stplayer = document.getElementById("idNombre1").value;
	el.parentNode.replaceChild(newEl, el);
}

function getReadyfuckingName2(){
	var el = document.getElementById("idTitle2");
	var newEl = document.createElement('p');
	newEl.innerHTML = document.getElementById("idNombre2").value;
	var name2ndplayer = document.getElementById("idNombre2").value;
	el.parentNode.replaceChild(newEl, el);

	document.getElementById("goGameButton").style.display = "block";
}

function goGame() {
	/*debugger;*/
	document.getElementById("goGameButton").style.display = "none";
	document.getElementById("space1stplayer").style.display = "block";
	check1stplayer();
}

/*function insertText1stplayer(){
	var el = document.getElementById("question1stplayer");
	var newEl = document.createElement('p');
	newEl.innerHTML = questions1stPlayer[0].question; 
	el.parentNode.replaceChild(newEl, el);}*/

/*END OF INTRO GAME*/

/*BEGINNING PLAYING GAME*/
	
var questionsPlayer = "";
var namePlayer = "";
var turn = false; //true = 1st player turn // false = 2nd player turn // winner =  there is a winner

function insertText1stplayer(i){
	var el = document.getElementById("question1stplayer");
		var res = str.replace(" ", questions1stPlayer[i].question);
		document.getElementById("question1stplayer").innerHTML = res;
	/*
	newEl.innerHTML = questions1stPlayer[i].question; 
	el.parentNode.replaceChild(newEl, el);}*/
	check1stplayer()
}



function check1stplayer(){
		/*debugger;*/
		if document.getElementById("question1stplayer") === " " {
			insert text//
		}//else check for an answer

		player1stAnswer = document.getElementById("answer1stplayer").value;

		for (var i = 0; i < questions1stPlayer.length; i++){
			
		insertText1stplayer(i);	

		if (player1stAnswer == questions1stPlayer[i].answer){
				questions1stPlayer[i].status = 3;
				questions1stPlayer[i].cycle = 0;
				questions1stPlayer[0].correctAnswers++;
				
				console.log("Correcto!");

				document.getElementById("answer1stplayer").value = ""

			} else if (player1stAnswer === null){
				
				/*turnandplay(turn);*/

			} else if (player1stAnswer == "pasapalabra"){
				questions1stPlayer[i].status = 1;
				questions1stPlayer[i].cycle++;
				questions1stPlayer[0].pasapalabraused++;
				
				console.log("Has dicho pasapalabra!")
				
				/*turnandplay(turn);*/

			} else if (player1stAnswer !== questions1stPlayer[i].answer){
				questions1stPlayer[i].cycle = 0;
				questions1stPlayer[0].wrongAnswers++;
				
				console.log("Oooooh! es incorrecto!");
				
				/*turnandplay(turn);*/
			}
	    }
	    
		
}
	
	
	
