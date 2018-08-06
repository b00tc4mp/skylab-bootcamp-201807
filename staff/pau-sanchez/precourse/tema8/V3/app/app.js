

function askName1st(){
	document.getElementById("askName1").style.display = "block";
	document.getElementById("empezar").style.display = "none";
}

function askName2nd(){
	document.getElementById("askName2").style.display = "block";
	document.getElementById("askName1").style.display = "none";
	document.getElementById("namePlayer1").innerHTML = document.getElementById("idNombre1").value;
	questions1stPlayer[0].name = document.getElementById("idNombre1").value;
	
}

function launch1stplayer1stturn(){
	
	document.getElementById("namePlayer2").innerHTML = document.getElementById("idNombre2").value;
	questions2ndPlayer[0].name = document.getElementById("idNombre2").value;
	document.getElementById("askName2").style.display = "none";
	hideEmpezarbutton();
	turn1stplayer();

}





function hideEmpezarbutton(){
	document.getElementById("empezar").style.display = "none";
	document.getElementById("restart").style.display = "block";
	document.getElementById("pasapalabraPlayer1").style.display = "block";
	document.getElementById("pasapalabraPlayer2").style.display = "block";
}

function hiderestartbutton(){
	document.getElementById("restart").style.display = "none";
}

function reload() {
	location.reload();
}


var quizContainer = document.getElementById("quiz");

function auto1stplayer(i){

		var injectHtml = [];
		injectHtml.push(
	        `<div class="question">${questions1stPlayer[i].question}</div>
	        <input id="answer" "type="text" value="">
	        <button type="button" id="submit" onclick="checkAnswerOf1stplayer(${i})">OK!</button>`
		);
		quizContainer.innerHTML = injectHtml.join("");
		if (questions1stPlayer[i].status !== 1){
			document.getElementById("circleplayer1_"+[i]).style.animation = "blinker 1s linear infinite";
		} else if (questions1stPlayer[i].status === 1 && questions1stPlayer[27].status === 0){
			document.getElementById("circleplayer1_"+[i]).style.animation = "none";
		} else {document.getElementById("circleplayer1_"+[i]).style.animation = "blinker 1s linear infinite";}

		

	}

function auto2ndplayer(i){
					
		var injectHtml = [];
		injectHtml.push(
	        `<div class="question">${questions2ndPlayer[i].question}</div>
	        <input id="answer" "type="text" value="">
	        <button type="button" id="submit" onclick="checkAnswerOf2ndplayer(${i})">OK!</button>`
	        
		);
		quizContainer.innerHTML = injectHtml.join("");
		if (questions2ndPlayer[i].status !== 1){
			document.getElementById("circleplayer2_"+[i]).style.animation = "blinker 1s linear infinite";
		} else if (questions2ndPlayer[i].status === 1 && questions2ndPlayer[27].status === 0){
			document.getElementById("circleplayer2_"+[i]).style.animation = "none";
		} else {document.getElementById("circleplayer2_"+[i]).style.animation = "blinker 1s linear infinite";}
	}	

function checkAnswerOf1stplayer(i){
	
	
	//document.getElementById("circleplayer1_"+[i]).style.animation = "none";
	
	
	if (document.getElementById("answer").value === questions1stPlayer[i].answer){
		document.getElementById("circleplayer1_"+[i]).style.animation = "none";
		questions1stPlayer[i].status = 3;
		questions1stPlayer[i].cycle = 0;
		questions1stPlayer[0].correctAnswers++;
		questions1stPlayer[0].totaldone++;
		correct1stplayer()
		document.getElementById("circleplayer1_"+[i]).style.background = "green";
		console.log("1st correcto!");
		console.log("1st Player// Correct: "+questions1stPlayer[0].correctAnswers+" Wrong: "+questions1stPlayer[0].wrongAnswers+" Pasapalabra: "+questions1stPlayer[0].pasapalabraused + " Done: "+questions1stPlayer[0].done+'\n' +
			"2nd Player// Correct: "+questions2ndPlayer[0].correctAnswers+" Wrong: "+questions2ndPlayer[0].wrongAnswers+" Pasapalabra: "+questions2ndPlayer[0].pasapalabraused + " Done: "+questions2ndPlayer[0].done);
		turn1stplayer();
	} else if(document.getElementById("answer").value === "pasapalabra"){
		document.getElementById("circleplayer1_"+[i]).style.animation = "none";
		questions1stPlayer[i].status = 1;
		questions1stPlayer[i].cycle = 0;
		questions1stPlayer[0].pasapalabraused++;
		pasapalabra1stplayer();
		document.getElementById("circleplayer1_"+[i]).style.background = "yellow";
		console.log("1st pasapalabra");
		console.log("1st Player// Correct: "+questions1stPlayer[0].correctAnswers+" Wrong: "+questions1stPlayer[0].wrongAnswers+" Pasapalabra: "+questions1stPlayer[0].pasapalabraused + " Done: "+questions1stPlayer[0].done+'\n' +
			"2nd Player// Correct: "+questions2ndPlayer[0].correctAnswers+" Wrong: "+questions2ndPlayer[0].wrongAnswers+" Pasapalabra: "+questions2ndPlayer[0].pasapalabraused + " Done: "+questions2ndPlayer[0].done);
		turn2ndplayer()
	} else if(document.getElementById("answer").value !== questions1stPlayer[i].answer){
		document.getElementById("circleplayer1_"+[i]).style.animation = "none";
		questions1stPlayer[i].status = 2;
		questions1stPlayer[i].cycle = 0;
		questions1stPlayer[0].wrongAnswers++;
		questions1stPlayer[0].totaldone++;
		wrong1stplayer()
		document.getElementById("circleplayer1_"+[i]).style.background = "red";
		console.log("1st incorrecto");
		console.log("1st Player// Correct: "+questions1stPlayer[0].correctAnswers+" Wrong: "+questions1stPlayer[0].wrongAnswers+" Pasapalabra: "+questions1stPlayer[0].pasapalabraused + " Done: "+questions1stPlayer[0].done+'\n' +
			"2nd Player// Correct: "+questions2ndPlayer[0].correctAnswers+" Wrong: "+questions2ndPlayer[0].wrongAnswers+" Pasapalabra: "+questions2ndPlayer[0].pasapalabraused + " Done: "+questions2ndPlayer[0].done);
		turn2ndplayer()
	}
}

function checkAnswerOf2ndplayer(i){

	document.getElementById("circleplayer2_"+[i]).style.animation = "none";

		
	if (document.getElementById("answer").value === questions2ndPlayer[i].answer){
		questions2ndPlayer[i].status = 3;
		questions2ndPlayer[i].cycle = 0;
		questions2ndPlayer[0].correctAnswers++;
		questions2ndPlayer[0].totaldone++;
		correct2ndplayer()
		document.getElementById("circleplayer2_"+[i]).style.background = "green";
		console.log("2nd correcto!");
		console.log("1st Player// Correct: "+questions1stPlayer[0].correctAnswers+" Wrong: "+questions1stPlayer[0].wrongAnswers+" Pasapalabra: "+questions1stPlayer[0].pasapalabraused + " Done: "+questions1stPlayer[0].done+'\n' +
			"2nd Player// Correct: "+questions2ndPlayer[0].correctAnswers+" Wrong: "+questions2ndPlayer[0].wrongAnswers+" Pasapalabra: "+questions2ndPlayer[0].pasapalabraused + " Done: "+questions2ndPlayer[0].done);
		turn2ndplayer();
	} else if(document.getElementById("answer").value === "pasapalabra"){
		questions2ndPlayer[i].status = 1;
		questions2ndPlayer[i].cycle++;
		questions2ndPlayer[0].pasapalabraused++;
		pasapalabra2ndplayer()
		document.getElementById("circleplayer2_"+[i]).style.background = "yellow";
		console.log("2nd pasapalabra");
		console.log("1st Player// Correct: "+questions1stPlayer[0].correctAnswers+" Wrong: "+questions1stPlayer[0].wrongAnswers+" Pasapalabra: "+questions1stPlayer[0].pasapalabraused + " Done: "+questions1stPlayer[0].done+'\n' +
			"2nd Player// Correct: "+questions2ndPlayer[0].correctAnswers+" Wrong: "+questions2ndPlayer[0].wrongAnswers+" Pasapalabra: "+questions2ndPlayer[0].pasapalabraused + " Done: "+questions2ndPlayer[0].done);
		turn1stplayer()
	} else if(document.getElementById("answer").value !== questions2ndPlayer[i].answer){
		questions2ndPlayer[i].status = 2;
		questions2ndPlayer[i].cycle = 0;
		questions2ndPlayer[0].wrongAnswers++;
		questions2ndPlayer[0].totaldone++;
		wrong2ndplayer()
		document.getElementById("circleplayer2_"+[i]).style.background = "red";
		console.log("2nd incorrecto");
		console.log("1st Player// Correct: "+questions1stPlayer[0].correctAnswers+" Wrong: "+questions1stPlayer[0].wrongAnswers+" Pasapalabra: "+questions1stPlayer[0].pasapalabraused + " Done: "+questions1stPlayer[0].done+'\n' +
			"2nd Player// Correct: "+questions2ndPlayer[0].correctAnswers+" Wrong: "+questions2ndPlayer[0].wrongAnswers+" Pasapalabra: "+questions2ndPlayer[0].pasapalabraused + " Done: "+questions2ndPlayer[0].done);
		turn1stplayer()
	}
}




function turn1stplayer(){
	
	//debugger;
	for (var i = 1; i < questions1stPlayer.length; i++){
		/*if (questions2ndPlayer[0].done === true && questions1stPlayer[0].done === true){
			console.log("se acabó!");
			finish();
			i=-1;
			break;
		} else*/ if (questions1stPlayer[0].totaldone === (questions1stPlayer.length - 1)){
			questions1stPlayer[0].done = true;
			console.log("questions1stPlayer[0].done: "+questions1stPlayer[0].done);
			i=questions1stPlayer.length;
			done();
		} else if (questions1stPlayer[i].status === 0){
			auto1stplayer(i);
			break;
		} else if (questions1stPlayer[i].status === 1){
			auto1stplayer(i);
			continue;
		} else if (questions1stPlayer[i].status === 2){
			continue;
		} else if (questions1stPlayer[i].status === 3){
			continue;
		} 
	}

}


function turn2ndplayer(){
	//debugger;
	for (var i = 1; i < questions2ndPlayer.length; i++){
		/*if (questions2ndPlayer[0].done === true && questions1stPlayer[0].done === true){
			console.log("se acabó!")
			done();
			i=-1;
			break;
		} else*/ if (questions2ndPlayer[0].totaldone === (questions2ndPlayer.length - 1)){
			questions2ndPlayer[0].done = true;
			console.log("questions2ndPlayer[0].done: "+questions2ndPlayer[0].done);
			i=questions2ndPlayer.length;
			done();
		} else if (questions2ndPlayer[i].status === 0){
			auto2ndplayer(i);
			break;
		} else if (questions2ndPlayer[i].status === 1){
			auto2ndplayer(i);
		} else if (questions2ndPlayer[i].status === 2){
			continue;
		} else if (questions2ndPlayer[i].status === 3){
			continue;
		}
	}

}

function done(){
		if (questions1stPlayer[0].done === true && questions2ndPlayer[0].done === true){
			if (questions1stPlayer[0].correctAnswers > questions2ndPlayer[0].correctAnswers){
				finish(questions1stPlayer[0].name);
			} else if (questions1stPlayer[0].correctAnswers < questions2ndPlayer[0].correctAnswers){
				finish(questions2ndPlayer[0].name);
			} else if (questions1stPlayer[0].correctAnswers === questions2ndPlayer[0].correctAnswers){
				draw();
			}
		} else if (questions1stPlayer[0].done === true && questions2ndPlayer[0].done === false){
		turn2ndplayer();
		} else if (questions1stPlayer[0].done === false && questions2ndPlayer[0].done === true){
		turn1stplayer();
	}
}



var questions1stPlayer = [
    {name:"", cyclePlayer: 1, correctAnswers: 0, wrongAnswers: 0, pasapalabraused: 0, totaldone: 0, done: false, winner: false},
    { letter: "a", answer: "abducir", status: 0, cycle: 1, question: ("CON LA A.<br>Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, cycle: 1, question: ("CON LA B.<br> Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, cycle: 1, round: 0, question: ("CON LA C.<br> Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, cycle: 1, round: 0, question: ("CON LA D.<br> Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, cycle: 1, round: 0, question: ("CON LA E.<br> Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, cycle: 1, round: 0, question: ("CON LA F.<br> Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, cycle: 1, round: 0, question: ("CON LA G.<br> Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, cycle: 1, round: 0, question: ("CON LA H.<br> Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, cycle: 1, round: 0, question: ("CON LA I.<br> Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, cycle: 1, round: 0, question: ("CON LA J.<br> Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, cycle: 1, round: 0, question: ("CON LA K.<br> Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, cycle: 1, round: 0, question: ("CON LA L.<br> Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, cycle: 1, round: 0, question: ("CON LA M.<br> Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, cycle: 1, round: 0, question: ("CON LA N.<br> Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA Ñ.<br> Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, cycle: 1, round: 0, question: ("CON LA O.<br> Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, cycle: 1, round: 0, question: ("CON LA P.<br> Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, cycle: 1, round: 0, question: ("CON LA Q.<br> Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, cycle: 1, round: 0, question: ("CON LA R.<br> Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, cycle: 1, round: 0, question: ("CON LA S.<br> Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, cycle: 1, round: 0, question: ("CON LA T.<br> Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, cycle: 1, round: 0, question: ("CON LA U.<br> Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, cycle: 1, round: 0, question: ("CON LA V.<br> Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA W.<br> Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA X.<br> Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA Y.<br> Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, cycle: 1, round: 0, question: ("CON LA Z.<br> Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]

var questions2ndPlayer = [
    {name:"", cyclePlayer: 1, correctAnswers: 0, wrongAnswers: 0, pasapalabraused: 0, totaldone: 0, done: false, winner: false},
    { letter: "a", answer: "abastecer", status: 0, cycle: 1, round: 0, question: ("CON LA A.<br> Proveer a alguien o a algo de bastimentos, víveres u otras cosas necesarias") },
    { letter: "b", answer: "bacanal", status: 0, cycle: 1, round: 0, question: ("CON LA B.<br> Dicho de ciertas fiestas de la Antigüedad: Celebradas en honor del dios Baco") },
    { letter: "c", answer: "caballo", status: 0, cycle: 1, round: 0, question: ("CON LA C.<br> Mamífero solípedo del orden de los perisodáctilos, de tamaño grande y extremidades largas.") },
    { letter: "d", answer: "dársena", status: 0, cycle: 1, round: 0, question: ("CON LA D.<br> Parte de un puerto resguardada artificialmente y adecuada para el fondeo y la carga y descarga de embarcaciones.") },
    { letter: "e", answer: "echar", status: 0, cycle: 1, round: 0, question: ("CON LA E.<br> Hacer que algo vaya a parar a alguna parte, dándole impulso") },
    { letter: "f", answer: "fabada", status: 0, cycle: 1, round: 0, question: ("CON LA F.<br> Potaje de judías con tocino, chorizo y morcilla, típico de Asturias.") },
    { letter: "g", answer: "gala", status: 0, cycle: 1, round: 0, question: ("CON LA G.<br> Vestido sobresaliente y lucido.") },
    { letter: "h", answer: "hambre", status: 0, cycle: 1, round: 0, question: ("CON LA H.<br> Gana y necesidad de comer.") },
    { letter: "i", answer: "idioma", status: 0, cycle: 1, round: 0, question: ("CON LA I.<br> Lengua de un pueblo o nación, o común a varios.") },
    { letter: "j", answer: "jabonar", status: 0, cycle: 1, round: 0, question: ("CON LA J.<br> Fregar o estregar la ropa u otras cosas con jabón y agua para lavarlas, emblanquecerlas o ablandarlas.") },
    { letter: "k", answer: "bikini", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA K.<br> Prenda femenina de baño compuesta de un sujetador y una braga.") },
    { letter: "l", answer: "lagar", status: 0, cycle: 1, round: 0, question: ("CON LA L.<br> Recipiente donde se pisa la uva para obtener el mosto.") },
    { letter: "m", answer: "macuto", status: 0, cycle: 1, round: 0, question: ("CON LA M.<br> Mochila, especialmente la del soldado.") },
    { letter: "n", answer: "nacer", status: 0, cycle: 1, round: 0, question: ("CON LA N.<br> Dicho de un ser vivo: Salir del vientre materno, del huevo o de la semilla.") },
    { letter: "ñ", answer: "acompañar", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA Ñ.<br> Estar o ir en compañía de otra u otras personas.") },
    { letter: "o", answer: "obra", status: 0, cycle: 1, round: 0, question: ("CON LA O.<br> Cosa hecha o producida por un agente.") },
    { letter: "p", answer: "padre", status: 0, cycle: 1, round: 0, question: ("CON LA P.<br> Varón o animal macho que ha engendrado a otro ser de su misma especie.") },
    { letter: "q", answer: "queja", status: 0, cycle: 1, round: 0, question: ("CON LA Q.<br> Expresión de dolor, pena o sentimiento.") },
    { letter: "r", answer: "rabo", status: 0, cycle: 1, round: 0, question: ("CON LA R.<br> Cosa que cuelga a semejanza de la cola de un animal.") },
    { letter: "s", answer: "sablazo", status: 0, cycle: 1, round: 0, question: ("CON LA S.<br> Acto de sacar dinero a alguien pidiéndoselo, por lo general, con habilidad o insistencia y sin intención de devolverlo.") },
    { letter: "t", answer: "tabú", status: 0, cycle: 1, round: 0, question: ("CON LA T.<br> Condición de las personas, instituciones y cosas a las que no es lícito censurar o mencionar.") },
    { letter: "u", answer: "ubicar", status: 0, cycle: 1, round: 0, question: ("CON LA U.<br> Situar o instalar en determinado espacio o lugar.") },
    { letter: "v", answer: "vaciar", status: 0, cycle: 1, round: 0, question: ("CON LA V.<br> Dejar vacío algo.") },
    { letter: "w", answer: "clown", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA W.<br> Payaso de circo, y especialmente el que, con aires de afectación y seriedad, forma pareja con el augusto.") },
    { letter: "x", answer: "conexión", status: 0, cycle: 1, round: 0, question: ("CONTIENE LA X.<br> Enlace, atadura, trabazón, concatenación de una cosa con otra.") },
    { letter: "y", answer: "yen", status: 0, cycle: 1, round: 0, question: ("CON LA Y.<br> Unidad monetaria del Japón.") },
    { letter: "z", answer: "zamarra", status: 0, cycle: 1, round: 0, question: ("CON LA Z.<br> Prenda de vestir, rústica, hecha de piel con su lana o pelo.") },
]


function wrong1stplayer(){
	circleplayer1_0.innerHTML = "<img style='width:275px' src=https://i.giphy.com/media/AjYsTtVxEEBPO/giphy.webp>";
	setTimeout(function(){circleplayer1_0.innerHTML = "<img src=styles/player1.png>";}, 1100);
}

function correct1stplayer(){
	circleplayer1_0.innerHTML = "<img style='width:275px' src=https://media0.giphy.com/media/Na33dsU2umStO/giphy.gif>";
	setTimeout(function(){circleplayer1_0.innerHTML = "<img src=styles/player1.png>";}, 1100);
}

function pasapalabra1stplayer(){
	circleplayer1_0.innerHTML = "<img style='width:275px' src=https://media2.giphy.com/media/a5viI92PAF89q/giphy.gif>";
	setTimeout(function(){circleplayer1_0.innerHTML = "<img src=styles/player1.png>";}, 2000);
	/*document.getElementById("circleplayer1_"+[i]).style.animation = "none";*/
}


function wrong2ndplayer(){
	circleplayer2_0.innerHTML = "<img style='width:355px; margin-left: -75px;' src=https://media1.giphy.com/media/hVmCCt5ikEUQ8/giphy.gif>";
	setTimeout(function(){circleplayer2_0.innerHTML = "<img src=styles/player2.png>";}, 1100);
}

function correct2ndplayer(){
	circleplayer2_0.innerHTML = "<img style='width:385px; margin-left: -150px;' src=https://media1.giphy.com/media/fkD36jhiqzJ9m/giphy.gif>";
	setTimeout(function(){circleplayer2_0.innerHTML = "<img src=styles/player2.png>";}, 1100);
}

function pasapalabra2ndplayer(){
	circleplayer2_0.innerHTML = "<img style='width:275px' src=https://media0.giphy.com/media/y3QOvy7xxMwKI/giphy.gif>";
	setTimeout(function(){circleplayer2_0.innerHTML = "<img src=styles/player2.png>";}, 1050);
}


  
function finish(winner){
	
	document.getElementById("quiz").style.visibility = "hidden";
	
	var injectHtml = [];
		injectHtml.push(
	        `<div id="results">
				<table style="width:150px">
					<tr>
						<th colspan="2">
						<p id="ranking">Ha ganado ${winner}!</p>
						</th>
					</tr>
					<tr>
						<td colspan="2">
						<p id="ranking" style="font-size:25px;">${questions1stPlayer[0].name}</p>
						</td>
					</tr>
					<tr>
						<td>
						<div class=circleCorrect>${questions1stPlayer[0].correctAnswers}</div>
						</td>
						<td>
						<div class=circleWrong>${questions1stPlayer[0].wrongAnswers}</div>
						</td>
					</tr>
					<tr>
						<td colspan="2">
						<p id="ranking" style="font-size:25px;">${questions2ndPlayer[0].name}</p>
						</td>
					</tr>
					<tr>
						<td>
						<div class=circleCorrect>${questions2ndPlayer[0].correctAnswers}</div>
						</td>
						<td>
						<div class=circleWrong>${questions2ndPlayer[0].wrongAnswers}</div>
						</td>
					</tr>
				</table>
			<div>` 
		);
		//quizContainer.innerHTML = injectHtml.join("");
		inBetweenCircles.innerHTML = injectHtml.join("");
}


function draw(){
	
	wrong1stplayer()
	wrong2ndplayer()

	document.getElementById("quiz").style.visibility = "hidden";
	
	var injectHtml = [];
		injectHtml.push(
	        `<div id="results">
				<table style="width:150px">
					<tr>
						<th colspan="2">
						<p id="ranking">Hay empate!</p>
						</th>
					</tr>
					<tr>
						<td colspan="2">
						<p id="ranking" style="font-size:25px;">${questions1stPlayer[0].name}</p>
						</td>
					</tr>
					<tr>
						<td>
						<div class=circleCorrect>${questions1stPlayer[0].correctAnswers}</div>
						</td>
						<td>
						<div class=circleWrong>${questions1stPlayer[0].wrongAnswers}</div>
						</td>
					</tr>
					<tr>
						<td colspan="2">
						<p id="ranking" style="font-size:25px;">${questions2ndPlayer[0].name}</p>
						</td>
					</tr>
					<tr>
						<td>
						<div class=circleCorrect>${questions2ndPlayer[0].correctAnswers}</div>
						</td>
						<td>
						<div class=circleWrong>${questions2ndPlayer[0].wrongAnswers}</div>
						</td>
					</tr>
				</table>
			<div>` 
		);
		
		inBetweenCircles.innerHTML = injectHtml.join("");
}








