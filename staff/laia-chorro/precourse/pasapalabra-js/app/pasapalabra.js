//PASAPALABRA UI

(function() {

	var pasapalabra = {
	 	user: {
	 		users: [], // A user has a name and points

	 		askName: function() {
				var name = document.getElementById('name').value;

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

	 		removeCurrentUser: function() {
	 			var users = pasapalabra.user.users,
					indexOfCurrentUser = users.length - 1;

	 			pasapalabra.user.users.splice(indexOfCurrentUser, 1);
	 		},

	 		printUserNameOverCircle: function() {
	 			var users = pasapalabra.user.users,
					indexOfCurrentUser = users.length - 1,
					currentName = users[indexOfCurrentUser].name;

				pasapalabra.generate.printMsgByQuerySelector(currentName, '#username-circle');
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

	 		updateNumCorrect: function() {
				var newestNumCorrect = pasapalabra.user.getPointsFromCurrentUser();
					
				pasapalabra.generate.printMsgByQuerySelector(newestNumCorrect, '#numCorrect-text');
			},

	 		printPointsFromCurrentUser: function() {
	 			var points = pasapalabra.user.getPointsFromCurrentUser(),
	 				msgPoints = '';

	 			if (points === pasapalabra.question.questions.length) {
	 				msgPoints = 'Yeaaaahh, you won Pasapalabra!!! You complete all the ' + points + ' words!';
	 			} else if (points === 0) {
					msgPoints = 'You did not guess any word. Hopefully next time you\'ll have better luck!';
	 			} else {
					msgPoints = 'You guess ' + points + ' words in total, congratulations!';
	 			}

	 			pasapalabra.generate.printMsgByQuerySelector(msgPoints, '#inner-pointsmsg');
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
	 				order = 0,
	 				tableRanking = document.querySelector('#ranking-container table tbody');

				ranking.forEach(function(user) {
					order++;
					var rankingRow = pasapalabra.generate.createRankingRow(order, user.name, user.points);
					tableRanking.appendChild(rankingRow);
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

			askQuestionByTurn: function() {
				var getQuestionByTurn = pasapalabra.question.getQuestionByTurn();

				pasapalabra.generate.printMsgByQuerySelector(getQuestionByTurn, '#inner-question p');

			},

			getAnswerByTurn: function() {
				var answerByTurn = document.getElementById('answer').value;

				if (answerByTurn) {
					pasapalabra.question.evaluateAnswer(answerByTurn);
				} else {
					pasapalabra.game.endGame();
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
						pasapalabra.user.updateNumCorrect();
						console.log('Yeah! ' + correctAnswer + ' was the correct answer.');
						pasapalabra.game.nextTurn(correctWord);
						break;
					case 'pasapalabra':
						passedLetter = questions[indexOfCurrentLetter].letter.toUpperCase();
						console.log('Pasapalabra for the letter: ' + passedLetter);
						pasapalabra.game.nextTurn(passWord);
						break;
					case 'end':
						pasapalabra.game.stopGame();
						pasapalabra.user.removeCurrentUser();
						break;
					default:
						console.log('Ouch, you failed this time. The correct answer was: ' + correctAnswer);
						pasapalabra.game.nextTurn(failWord);
				}
			},

			getQuestionByTurn: function() {
				var questions = pasapalabra.question.questions,
					indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter,
					initLetterPos = pasapalabra.question.indexOfCurrentLetter;

					while (questions[indexOfCurrentLetter].status !== 0) { // Look for the first letter not answered yet
							pasapalabra.question.updateIndexOfCurrentLetter();
							indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter;
						if (indexOfCurrentLetter === initLetterPos) { // In case all the letters have been answered we stop the game
							pasapalabra.game.endGame();
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
	 			pasapalabra.generate.countDuration = 130;
	 			pasapalabra.question.restartQuestionsStatusToZero();
	 			pasapalabra.question.askQuestionByTurn();
	 			pasapalabra.generate.blinkCurrentLetter();
	 			pasapalabra.generate.startCountdown();
	 		},

	 		stopGame: function() {
	 			pasapalabra.generate.stopCounter();
	 			pasapalabra.generate.printDurationOnCountdown(0);
	 			pasapalabra.generate.clearInputById('answer');
	 			pasapalabra.user.printPointsFromCurrentUser();
	 			pasapalabra.display.endMsgInsideCircle();
	 		},

	 		endGame: function() {
	 			pasapalabra.game.stopGame();
	 			pasapalabra.display.rankingTable();
	 			pasapalabra.generate.emptyTableContainer();
	 			pasapalabra.user.printUsersRanking();
	 		},

	 		nextTurn: function(isWordCorrect) {
				pasapalabra.question.updateStatusByLetter(isWordCorrect);
				pasapalabra.generate.updateLetterColorByStatus(isWordCorrect);
				pasapalabra.generate.clearInputById('answer');
				pasapalabra.question.updateIndexOfCurrentLetter();
				pasapalabra.question.askQuestionByTurn();
				pasapalabra.generate.blinkCurrentLetter();
	 		}
	 	},

	 	generate: {

			countDuration: 130,

			countdownId: 0,

			startCountdown: function() {
				var countDuration = pasapalabra.generate.countDuration;
				pasapalabra.generate.countdownId = setInterval(function(){
					countDuration--;

			        pasapalabra.generate.printDurationOnCountdown(countDuration);

			        if (countDuration <= 0) {
			            pasapalabra.game.endGame();
		            }	
	            }, 1000);
			},

            stopCounter: function() {
            	clearInterval(pasapalabra.generate.countdownId); //stop countdown when we arrive to 0
            },

			printDurationOnCountdown: function(countDuration) {
				pasapalabra.generate.printMsgByQuerySelector(countDuration, '#countdown-text');
			},

	 		drawLettersOverCircle: function() {
	 			var order = 0,
	 				questions = pasapalabra.question.questions,
	 				letterContainer = document.getElementById('letter-container'),
	 				circleletter = document.getElementsByClassName('circle-letter')[0],
	 				radius = letterContainer.clientWidth / 2,
	 				offset = radius - circleletter.offsetWidth / 2,
	 				degreePerLetter = 360 / questions.length;

	 			questions.forEach(function(question) {
	 				var letter = question.letter,
	 					letterDiv = pasapalabra.generate.createNodeByLetter(letter),
						degreeLetter = (degreePerLetter * order - 90) * (Math.PI / 180),
	 					y = Math.sin(degreeLetter) * radius,
	 					x = Math.cos(degreeLetter) * radius;

					order++;

					letterContainer.appendChild(letterDiv);
					letterDiv.style.top = (y + offset).toString() + 'px';
					letterDiv.style.left = (x + offset).toString() + 'px';
				});
			},

			emptyLetterContainer: function() {
				var letterContainer = document.getElementById('letter-container');

				while (letterContainer.firstChild) {
					letterContainer.removeChild(letterContainer.firstChild);
				}
			},

			createNodeByLetter: function(letter) {
				var letterNode = document.createElement('div'),
					letterSpan = document.createElement('span');

				letterNode.className = 'circle-letter';
				letterNode.setAttribute('value', letter);
				letterSpan.innerHTML = letter;
				letterNode.appendChild(letterSpan);

				return letterNode;
			},

			createRankingRow: function(ranking, user, points) {
				var row = document.createElement('tr'),
					rankingCol = document.createElement('td'),
					userCol = document.createElement('td'),
					pointsCol = document.createElement('td');

				rankingCol.innerHTML = ranking;
				userCol.innerHTML = user;
				pointsCol.innerHTML = points;
				row.appendChild(rankingCol);
				row.appendChild(userCol);
				row.appendChild(pointsCol);

				return row;
			},

			emptyTableContainer: function() {
				var tbodyRanking = document.querySelector('.ranking-container table tbody');

				while (tbodyRanking.firstChild) {
					tbodyRanking.removeChild(tbodyRanking.firstChild);
				}
			},

			printMsgByQuerySelector: function(msg, querySelector) {
				var innerMsg = document.querySelector(querySelector);

				if (innerMsg) {
					innerMsg.innerHTML = msg;
				}
			},

			getCurrentNodeLetter: function() {
				var indexOfCurrentLetter = pasapalabra.question.indexOfCurrentLetter,
					currentLetter = pasapalabra.question.questions[indexOfCurrentLetter].letter,
					nodeLetter = document.querySelector('.circle-letter[value="' + currentLetter + '"]');

				return nodeLetter;
			},

			updateLetterColorByStatus: function(isWordCorrect) {
				var nodeLetter = pasapalabra.generate.getCurrentNodeLetter();

				if (isWordCorrect > 0) {
					nodeLetter.classList.add('good');
				} else if (isWordCorrect < 0) {
					nodeLetter.classList.add('bad');
				}
			},

			blinkCurrentLetter: function() {
				var nodeLetter = pasapalabra.generate.getCurrentNodeLetter(),
					lastBlinkerLetter = document.querySelector('.circle-letter .blink');

				if (lastBlinkerLetter) {
					lastBlinkerLetter.classList.remove('blink'); //stop blinking the last letter
				}

				if (!nodeLetter.classList.contains('good') && !nodeLetter.classList.contains('bad')) {
					nodeLetter.querySelector('span').classList.add('blink');
				}	
			},

			clearInputById: function(id) {
				document.getElementById(id).value = '';
			},

	 	},

	 	display: {

			addEvents: function() {
				document.getElementById('answer').addEventListener('change', function(){
					pasapalabra.question.getAnswerByTurn();
				});

				document.getElementById('new-game').addEventListener('click', function(){
					pasapalabra.user.saveUser();
					pasapalabra.display.pasapalabraScreen();
					pasapalabra.user.printUserNameOverCircle();
					pasapalabra.generate.emptyLetterContainer();
					pasapalabra.generate.drawLettersOverCircle();
					pasapalabra.generate.printDurationOnCountdown(pasapalabra.generate.countDuration);
					pasapalabra.game.startGame();
				});

				document.getElementById('restart').addEventListener('click', function(){
					pasapalabra.display.questionInsideCircle();
					pasapalabra.display.welcomeScreen();
					pasapalabra.generate.clearInputById('name');
				});

				document.getElementById('stop').addEventListener('click', function(){
					pasapalabra.game.stopGame();
					pasapalabra.user.removeCurrentUser();
				});
			},

			pasapalabraScreen: function() {
				pasapalabra.display.showElemById('pasapalabra-container');
				pasapalabra.display.hideElemById('welcome-container');
			},

			welcomeScreen: function() {
				pasapalabra.display.showElemById('welcome-container');
				pasapalabra.display.hideElemById('pasapalabra-container');
				pasapalabra.display.hideElemById('ranking-container');
			},

			questionInsideCircle: function() {
				pasapalabra.display.showElemById('inner-question');
				pasapalabra.display.showElemById('stop');
				pasapalabra.display.hideElemById('inner-endmsg');
			},

			endMsgInsideCircle: function() {
				pasapalabra.display.showElemById('inner-endmsg');
				pasapalabra.display.hideElemById('inner-question');
				pasapalabra.display.hideElemById('stop');
			},

			rankingTable: function() {
				pasapalabra.display.showElemById('ranking-container');
			},

			showElemById: function(idToSHow) {
				var elemToSHow = document.getElementById(idToSHow);

				if (elemToSHow && elemToSHow.classList.contains('hide')) {
					elemToSHow.classList.remove('hide');
				}
			},

			hideElemById: function(idToHide) {
				var elemToHide = document.getElementById(idToHide);

				if (elemToHide && !elemToHide.classList.contains('hide')) {
					elemToHide.classList.add('hide');
				}
			},

	 	},

	 	init: function() {
			pasapalabra.display.addEvents();
	 	}

	};


	pasapalabra.init();
	
})()