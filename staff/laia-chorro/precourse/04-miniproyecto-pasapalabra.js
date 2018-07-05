/*Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario deberá adivinar que palabra estamos tratando, por ejemplo:

'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!
Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo respondido todas las letras, deberá indicarle al usuario cuantas
 letras ha fallado y cuantas ha acertado. Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento, el usuario
 no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. El juego deberá, cuando finalize, mostrar un ranking de 
 usuarios con el nombre y ordenados por cantidad de letras acertadas.*/

 /*
PRO

Los usuarios deberán tener tiempo límite por cada juego, por ejemplo 130 segundos... Resource: https://www.w3schools.com/jsref/met_win_settimeout.asp
El programa no debería hacer distinciones entre mayúsculas, minúsculas... Ejemplo: "animal" == "ANIMAL" // "Animal" // "aNiMal"...
El programa debe estar preparado para aceptar el input "END" para terminar el juego en cualquier momento, si esto sucede, el programa dirá 
cuantas letras ha acertado pero no entrará en el ranking.
Prepara tu programa para que no repita siempre las mismas preguntas, por ejemplo, de la misma letra, se podrían hacer tres preguntas diferentes.
 */

 var pasapalabra = {
 	user: {
 		users: [], // A user has a name and points

 		askName: function() {
			var name = prompt('Welcome again to Pasapalabra! Can I get your name?');

			return name || 'Visitor';
 		},

 		saveUser: function() {
 			var users = pasapalabra.user.users,
 				user = {
	 				name: pasapalabra.user.askName(),
	 				points: 0
	 			};

 			users.push(user);
 		},

 		sumOnePointToCurrentUser: function() {
 			var users = pasapalabra.user.users,
				indexOfCurrentUser = users.length - 1;

			users[indexOfCurrentUser].points++;
 		},

 		getPointsFromCurrentUser: function() {
 			var users = pasapalabra.user.users,
				indexOfCurrentUser = users.length - 1;

			return users[indexOfCurrentUser].points;
 		},

 		printPointsFromCurrentUser: function() {
 			var points = pasapalabra.user.getPointsFromCurrentUser();

 			if (points === pasapalabra.question.questions.length) {
 				console.log('Yeaaaahh, you won Pasapalabra!!! You complete all the ' + points + ' words!');
 			} else if (points === 0) {
				console.log('You did not guess any word, hopefully next time you\'ll have better luck!');
 			} else {
				console.log('You guess ' + points + ' words in total, congratulations!');
 			}
 		},

 		sortUsersByPoints: function() {
			var users = pasapalabra.user.users,
				ranking = users.sort(function (a, b) {
					return b.points - a.points;
				});

			return ranking;
 		},

 		printUsersRanking: function() {
 			var ranking = pasapalabra.user.sortUsersByPoints(),
 				order = 0;

			console.log('Users Ranking:');

			ranking.forEach(function(user) {
				order++;
				console.log(order + 'º. ' + user.name + ' => ' + user.points);
			});
 		}

 	},

 	question: {
 		questions: [
				    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
				    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
				    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé" },
				    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida" },
				    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación" },
				    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad" },
				    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas" },
				    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento" },
				    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano" },
				    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba" },
				    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria" },
				    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo" },
				    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas" },
				    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia" },
				    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo." },
				    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien" },
				    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft" },
				    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche" },
				    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
				    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático" },
				    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984" },
				    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914" },
				    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa" },
				    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso" },
				    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética" },
				    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos" },
				    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional" },
				],

		indexOfCurrentLetter: 0,

		restartQuestionsStatusToZero: function() {
			pasapalabra.question.questions.forEach(function(question) {
				question.status = 0;
			});
		},

		/*askQuestionByLetter: function(letter) {
			var questionObjByLetter = pasapalabra.question.getQuestionObjByLetter(letter),
				answerByLetter = prompt(questionObjByLetter.question);

			if (answerByLetter) {
				answerByLetter = answerByLetter.toLowerCase();
				pasapalabra.question.evaluateAnswer(answerByLetter);
			} else {
				pasapalabra.game.endGame();
			}
		},*/

		askQuestionByTurn: function() {
			var getQuestionByTurn = pasapalabra.question.getQuestionByTurn(),
				answerByTurn;

			if (getQuestionByTurn) {
				answerByTurn = prompt(getQuestionByTurn);

				if (answerByTurn) {
					answerByTurn = answerByTurn.toLowerCase();
					pasapalabra.question.evaluateAnswer(answerByTurn);
				} else {
					pasapalabra.game.endGame();
				}
			}
		},

		evaluateAnswer: function(answer) {
			var passWord = 0,
				correctWord = 1,
				failWord = -1,
				questions = pasapalabra.question.questions,
				indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter,
				correctAnswer = questions[indexOfCurrentLetter].answer,
				passedLetter = '';

			switch (answer) {
				case correctAnswer:
					pasapalabra.user.sumOnePointToCurrentUser();
					console.log('Yeah! ' + correctAnswer + ' was the correct answer.');
					pasapalabra.game.nextTurn(correctWord);
					break;
				case 'pasapalabra':
					passedLetter = questions[indexOfCurrentLetter].letter.toUpperCase();
					console.log('Pasapalabra for the letter: ' + passedLetter);
					pasapalabra.game.nextTurn(passWord);
					break;
				case 'end':
					pasapalabra.game.endGame();
					break;
				default:
					console.log('Ouch, you failed this time. The correct answer was: ' + correctAnswer);
					pasapalabra.game.nextTurn(failWord);
			}
		},

		/*getQuestionObjByLetter: function(letter) {
			var questions = pasapalabra.question.questions,
				questionObjByLetter = questions.find(function(question) { 
					return question.letter === letter;
				});

			return questionObjByLetter;
		},*/

		getQuestionByTurn: function() {
			var questions = pasapalabra.question.questions,
				indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter,
				initLetterPos = pasapalabra.question.indexOfCurrentLetter;

				while (questions[indexOfCurrentLetter].status !== 0) { // Look for the first letter not answered yet
						pasapalabra.question.updateIndexOfCurrentLetter();
						indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter;
					if (indexOfCurrentLetter === initLetterPos) { // In case all the letters have been answered we stop the game
						pasapalabra.game.restartGame();
						return false;
					}
				}

			return questions[indexOfCurrentLetter].question;
		},

		updateStatusByLetter: function(isWordCorrect) {
			var indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter,
				questions = pasapalabra.question.questions;

			questions[indexOfCurrentLetter].status = isWordCorrect;
		},

		updateIndexOfCurrentLetter: function() {
			var questions = pasapalabra.question.questions;

			if (pasapalabra.question.indexOfCurrentLetter < questions.length - 1) {
				pasapalabra.question.indexOfCurrentLetter++; // Next letter in the alphabet
			} else {
				pasapalabra.question.indexOfCurrentLetter = 0; // At the end of the alphabet restart the loop again from the first letter
			}
		}

 	},

 	game: {

 		startGame: function() {
 			pasapalabra.question.indexOfCurrentLetter = 0;
 			pasapalabra.question.restartQuestionsStatusToZero();
 			pasapalabra.question.askQuestionByTurn();
 			/*setTimeout(function() {
 				pasapalabra.game.stopGame();
 			}, 3000);//130 * 1000);*/
 		},

 		endGame: function() {
 			console.log('\nThe game has ended.\n');
 			pasapalabra.user.printPointsFromCurrentUser();
 		},

 		nextTurn: function(isWordCorrect) {
			pasapalabra.question.updateStatusByLetter(isWordCorrect);
			pasapalabra.question.updateIndexOfCurrentLetter();
			pasapalabra.question.askQuestionByTurn();
 		},

 		restartGame: function() {
 			pasapalabra.game.endGame();
 			pasapalabra.user.printUsersRanking();
 			pasapalabra.game.askToStartNewRoundNewUser();
 		},

 		/*stopGame: function() {
 			console.log('STOOOOOOOOOOOOOP');
 			window.prompt = function() { return false; };
 			pasapalabra.game.endGame();
 		},*/

 		askToStartNewRoundNewUser: function() {
 			var isNewRound = confirm('Does somebody wants to play a new round?');

			if (isNewRound) {
				pasapalabra.init();
			} else {
				console.log('Bye bye!')
			}
 		}

 	},

 	init: function() {
 		pasapalabra.user.saveUser();
 		pasapalabra.game.startGame();
 	}

 };

 pasapalabra.init();