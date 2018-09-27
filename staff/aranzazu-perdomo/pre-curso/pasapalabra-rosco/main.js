var userGameBox = [
{user: 'JHON NIEVE', points: 21},
{user: 'DAENERYS TARGARYEN', points: 20},
{user: 'TYRION LANNISTER', points: 15},

];
var userNameBox = ['JHON NIEVE','DAENERYS TARGARYEN','TYRION LANNISTER'];
var questionsAcc = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;
var timeLeft;
var timerGenerate;
var gameTest = document.getElementById('preguntas');
var userAnswer = document.getElementById('respuesta');
var userName = document.getElementById('usuario').value;

//Base de datos de preguntas y respuestas
var questions = [
    {letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien")},
    {letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso")},
    {letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé")},
    {letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida")},
    {letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación")},
    {letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad")},
    {letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas")},
    {letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento")},
    {letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano")},
    {letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba")},
    {letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria")},
    {letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo")},
    {letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas")},
    {letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia")},
    {letter: "ñ", answer: "señal", status:0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.")},
    {letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien")},
    {letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft")},
    {letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche")},
    {letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor")},
    {letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático")},
    {letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984")},
    {letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914")},
    {letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa")},
    {letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso")},
    {letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética")},
    {letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos")},
    {letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional")},
]
function showInstructions() {
	document.getElementById('instrucciones').style.visbility = 'visible';
}



//Salir del juego
function endGame() {
	clearInterval(timerGenerate);
	document.getElementById('menu-principal').style.display = 'block';
	document.getElementById('introducir-nombre').style.visibility = "hidden";
	document.getElementById('contenedor-juego').style.visibility = "hidden";
	document.getElementById('contenedor-principal').style.visibility = "visible";
}
//Botón volver a menú principal
function returnToMenu() {
	document.getElementById('menu-principal').style.display = 'block';
	document.getElementById('introducir-nombre').style.visibility = "hidden";
	document.getElementById('contenedor-juego').style.visibility = "hidden";
	document.getElementById('contenedor-ranking').style.visibility = 'hidden';
	document.getElementById('contenedor-principal').style.visibility = "visible";
	document.getElementById('contenedor-instrucciones').style.visibility = "hidden";
}

//Panel nuevo ususario visible
function newUserIntro() {
	document.getElementById('usuario').value = "";
	document.getElementById('introducir-nombre').style.visibility = "visible";
	document.getElementById('alerta').style.visibility = 'hidden';
	document.getElementById('usuario').focus()
}

//Introducción de nuevo usuario 
function newUser() {
	userName = document.getElementById('usuario').value;
	userName = userName.toUpperCase();
	if (userName === '') {
	} else if (userNameBox.indexOf(userName) === -1) {
		userNameBox.push(userName);
		document.getElementById('contenedor-principal').style.visibility = "hidden";
		document.getElementById('menu-principal').style.display = 'none';
		document.getElementById('contenedor-juego').style.visibility = "visible";
		document.getElementById('correcto').innerHTML = "Aciertos";
		document.getElementById('incorrecto').innerHTML = "Errores";
		document.getElementById('correcto').style.color = "white";
		document.getElementById('incorrecto').style.color = "white";
		questionsAcc = 0;
		correctAnswer = 0;
		incorrectAnswer = 0;
		for(var i = 0; i < questions.length; i++) {
			questions[i].status = 0;
			document.getElementsByClassName('results')[i].style.backgroundColor = 'white';
		}
		gameQuestions();
		timer();
	} else {
		document.getElementById('alerta').style.visibility = 'visible';
		setTimeout(newUserIntro, 2000);
	};
	document.getElementById('respuesta').focus()
}

//Generador de preguntas
function gameQuestions() {	
	userAnswer.value = "";
	if (questions[questionsAcc].status === 0) {
		gameTest.innerHTML = questions[questionsAcc].question;
	} else {
		goToList();
	}
}

//Condicionales de respuesta
function answerAnalyzer() {
	userAnswer.value = userAnswer.value.toLowerCase();
	if(userAnswer.value === questions[questionsAcc].answer) {
		
        correctAnswer++;
		document.getElementById('correcto').innerHTML = '<span style="color:white">' + 'Aciertos: ' + '</span>' + correctAnswer;
        document.getElementById('correcto').style.color='green';
		goToList();
	} else {
		
		incorrectAnswer++;
		document.getElementById('incorrecto').innerHTML = '<span style="color:white">' + 'Errores: ' + '</span>' + incorrectAnswer;
        document.getElementById('correcto').style.color='rojo';
		goToList();
	};
};

//Ususario pulsa PASAPALABRA
function userPasapalabra() {
		
		goToList();
}

//Generar usuario y puntuación
function userGenerator() {
	userGameBox.push({
		user: userName, 
		points: correctAnswer,
	});
}

//Analisis de respuestas
function goToList() {
	if (questionsAcc < questions.length - 1) {
		questionsAcc++;
		gameQuestions();
		document.getElementById('respuesta').focus()
	} else if (questionsAcc === questions.length - 1 && correctAnswer + incorrectAnswer === questions.length) {
		clearInterval(timerGenerate);
		userGenerator();
		generateBestPlayers();
	} else if (questionsAcc === questions.length - 1) {
		questionsAcc = 0;
		gameQuestions();
	};
}

//Generar clasificación de usuarios
function generateBestPlayers() {
	document.getElementById('contenedor-principal').style.visibility = "hidden";
	document.getElementById('contenedor-juego').style.visibility = "hidden";
	document.getElementById('contendero-ranking').style.visibility = "visible";
	function list() {
		function gameRanking() {
			userGameBox.sort(function (a, b){
				return (b.points - a.points)
			});
		}
		gameRanking();
		var filterUser = userGameBox.filter(function(value) {
			return (value.user)
		});
		for(var i = 0; i < filterUser.length; i++) {
			document.getElementById('primero').innerHTML = ('<span style="color:orange">' + filterUser[0].user + '</span>' + ' con un total de: ' + filterUser[0].points + ' puntos');
			document.getElementById('segundo').innerHTML = ('<span style="color:orange">' + filterUser[1].user + '</span>' + ' con un total de: ' + filterUser[1].points + ' puntos');
			document.getElementById('tercero').innerHTML = ('<span style="color:orange">' + filterUser[2].user + '</span>' + ' con un total de: ' + filterUser[2].points + ' puntos');
			
		};
	}
	list()
}

//Mostrar clasificación desde menú principal
function mostrarRanking() {
	document.getElementById('contenedor-principal').style.visibility = "hidden";
	document.getElementById('contenedor-ranking').style.visibility = "visible";
	document.getElementById('introducir-nombre').style.visibility = "hidden";
}

//Mostrar instrucciones del juego
function mostrarInstrucciones() {
	document.getElementById('contenedor-principal').style.visibility = "hidden";
	document.getElementById('contenedor-instrucciones').style.visibility = "visible";
	document.getElementById('introducir-nombre').style.visibility = "hidden";
}

//Cuenta atrás
function timer() {
	var timerPanel = document.getElementById("timer");
	timerPanel.innerHTML = "180";
	timeLeft = 180;
	timerGenerate = setInterval(function() {
		timeLeft--;
		if (timeLeft <= 10 ) {
			timerPanel.style.color = "red";
		};
		if (timeLeft === 0) {
			clearInterval(timerGenerate);
			userGenerator();
			generateBestPlayers();
		}
		timerPanel.innerHTML = timeLeft;
	},1000)
}
