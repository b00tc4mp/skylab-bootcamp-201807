// renderizar la interfaz

buildUI(questions);

// start/stop game

var gameOver = true;
var boton = document.getElementById("start");
var definicion = document.getElementById(`def`);
boton.addEventListener("click", function() {
	if(gameOver) {
		gameOver = false;
		boton.innerText = `PARAR`;
		boton.classList.add('stop');
		boton.classList.remove('start');
		startGame();
	} else {
		gameOver = true;
		boton.innerText = `JUGAR`;
		boton.classList.add('start');
		boton.classList.remove('stop');
		definicion.innerText = '';
		stopTimer();
		printStats();
	}
});

var marcador = document.getElementById(`marcador`);
var it = -1;
function resetGame() {
	name = prompt("Introduce tu nombre: ");
	stopTimer();
	document.getElementById("temp").innerText = `Tiempo: 0 s`;
	def.innerText = '';
	marcador.innerText = 'Aciertos: 0'
	it = -1;
	for(var i=0; i<questions.length; i++) {
		var letra = questions[i].letter.toUpperCase();
		document.getElementById(`${letra}`).classList.remove('acierto');
		document.getElementById(`${letra}`).classList.remove('fallo');
	}
}

// juego

var totalTime = 130; // tiempo para jugar (segundos)
var ranking = []; // tabla de puntuaciones
var stats;
var name;
function startGame() {

	resetGame();

	// partida completa
	stats = {pasa: 1, aciertos: 0, fallos: 0}; 
	questions.forEach(function(q){q.status=0;}); 
	startTimer();
	next();
}

function endGame() {
	boton.click();
}

var answer;
var q;
function next() {
	
	it++;
	if(it >= questions.length) {
		if(stats.aciertos + stats.fallos == questions.length) {
			endGame();
			return;
		}
		it = 0;
	}
	// BUG: al hacer pasapalabra, la siguiente ronda escoge otra pregunta diferente !
	q = questions[it];
	if (q.status == 0) {				
		var randomId = Math.floor(Math.random()*q.qArray.length);
		var question = q.qArray[randomId].question;
		definicion.innerText = question;
		answer = q.qArray[randomId].answer;
	} else {
		next();
	}

}

var respuesta = document.getElementById(`respuesta`);
function checkAnswer() {
	var texto = respuesta.value.toLowerCase();
	if (texto == answer) {
		document.getElementById(`${q.letter}`.toUpperCase()).classList.add('acierto');
		q.status = 1;
		stats.aciertos++;
	} else if (texto == "pasapalabra") {
		stats.pasa ++;
	} else {
		document.getElementById(`${q.letter}`.toUpperCase()).classList.add('fallo');
		q.status = -1;
		stats.fallos++;
	} 
	respuesta.value = '';
	marcador.innerText = `Aciertos: ${stats.aciertos}`;
}

// recibir respuestas
var respuesta = document.getElementById(`respuesta`);
respuesta.addEventListener("keydown", function() {
	if(event.keyCode === 13 && !gameOver) {
		checkAnswer();
		next();
	}
});

// ranking
var MAX_LENGTH = 5;
function printStats() {
		
	// ranking
	if(stats.aciertos + stats.fallos == questions.length) {
		ranking.push({name: name, aciertos: stats.aciertos})
		ranking.sort(function(a,b){
			return b.aciertos - a.aciertos;
		})
		ranking = ranking.slice(0,MAX_LENGTH);
		console.log("Ranking")
		console.table(ranking);

		var table = `<table> <tr> <th> Nombre </th> <th> Aciertos </th> </tr>`;
		for(var i=0; i<ranking.length; i++) {
			table += `<tr> <td> ${ranking[i].name}</td> <td> ${ranking[i].aciertos} </td> </tr>`
		}
		table += `</table>`;

		document.getElementById("juego").insertAdjacentHTML('beforeend', table);
	}
	
}