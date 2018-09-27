/*
Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y 
deberá guardarse. Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre),
 para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número,
  si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. 
  El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario 
  qué número se ha encontrado. El programa deberá preguntar al usuario al inicio de cada turno si 
  desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.

Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!",
 pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón.
 Por último, deberá preguntar si desea volver a jugar.
*/


var bingo = {

	user: {
		usersList: [],

		getUserName: function() {
			var userName = prompt('Hello! What is your name?');

			return userName || 'Visitor';
		},

		saveUserName: function() {
			var userName = bingo.user.getUserName();
			bingo.user.usersList.push(userName);
		}
	},

	card: {
		linesInCard: 3,
		columnsInCard: 5,
		bingoCard: [],

		generateNewLine: function(columns) {
			var newLine = [];

			for (var i=0; i<columns; i++) {
				var randomNumber = bingo.roller.extractUniqueRandomNumberFromBalls(),
					cardNumber = {
						number: randomNumber || ' - ',
						matched: false
					};
				newLine.push(cardNumber);
			}

			return newLine;
		},

		generateNewCard: function() {
			var lines = bingo.card.linesInCard,
				columns = bingo.card.columnsInCard;

			bingo.card.bingoCard = []; // Empty card before generating a new one

			// Generate all possible numbers inside the roller. 
			// These are the same numbers that can be in each card
			bingo.roller.fillRollerWithBalls();

			for (var i=0; i<lines; i++) {
				var newLine = bingo.card.generateNewLine(columns);
				bingo.card.bingoCard.push(newLine);
			}
		},

		showCard: function() {
			var bingoCard = bingo.card.bingoCard,
				numbersInCard = '';

			for (var i in bingoCard) {
				var line = bingoCard[i],
					numbersInLine = '';

				for (var j in line) {
					var number = bingo.card.parseNum(line[j].number);

					numbersInLine += number + '  ';
				}

				numbersInCard += numbersInLine + '\n';
			}

			console.log(numbersInCard);
		},

		parseNum: function(num) {
			if (num < 10) {
				num = ' ' + num + ' ';
			} else if (num < 100) {
				num = ' ' + num;
			}
			return num;
		},

		askForAnotherCard: function() {
			var askForNewCard = prompt('Do you like your bingo card? \n' +
				'Say "yes" for keeping it, or "no" if you prefer another one.');

			if (askForNewCard && askForNewCard.toLowerCase() === 'no') {
				console.log('No problem, here you have your new card:');
				bingo.card.getNewCard();
			} else {
				console.log('Let\'s start!');
				bingo.game.startNewGame();
			}
		},

		getNewCard: function() {
			console.log('\nHere you have your new card:');
			bingo.card.generateNewCard();
			bingo.card.showCard();
			bingo.card.askForAnotherCard();
		},

		crossNumberInCardByBall: function() {
			var bingoCard = bingo.card.bingoCard, 
				extractedNum = bingo.roller.currentBall,
				lineMatched;

			for (var i in bingoCard) {
				var line = bingoCard[i];
				for (var j in line) {
					if (line[j].number === extractedNum) {
			    		bingo.card.bingoCard[i][j].number = ' X ';
			    		bingo.card.bingoCard[i][j].matched = true;
			    		lineMatched = i;
					}
				}
			}

			bingo.card.showCard();
			bingo.card.callResultInCardByTurn(lineMatched);
		},

		callResultInCardByTurn: function(lineMatched) {
			if (lineMatched) {
				var extractedNum = bingo.roller.currentBall;

				console.log('Yay! Number ' + extractedNum + ' is in your card.');

	    		if (bingo.card.isAllNumCardCrossed()) {
	    			console.log('BINGOOOOOOOOOO!!!!');
					bingo.game.endGame();
	    		} else {
	    			bingo.card.callBingoLineWhenCrossed(lineMatched);
	    			bingo.game.askToContinueTheGame();
	    		}
			} else {
				console.log('You were not lucky this time :(');
				bingo.game.askToContinueTheGame();
			}
		},

		callBingoLineWhenCrossed: function(lineNum) {
			if (bingo.card.isLineCardCrossed(lineNum)) {
				console.log('BINGO LINE!!');
			}
		},

		isLineCardCrossed: function(lineNum) {
			var isMatched = function(num) {return num.matched;},
				isLineCrossed = bingo.card.bingoCard[lineNum].every(isMatched);

			return isLineCrossed;
		},

		isAllNumCardCrossed: function() {
			var allNumCardCrossed = bingo.card.bingoCard.every(function(line) {
				return line.every(function(numCard) {
					return numCard.matched;
				});
			});

			return allNumCardCrossed;
		}

	},

	roller: {
		maxBalls: 100,
		balls: [],
		currentBall: null,

		fillRollerWithBalls: function() {
			var maxBalls = bingo.roller.maxBalls,
				numBall = 0;

			bingo.roller.balls = []; // Empty the roller before filling it with balls

			while (numBall < maxBalls) {
				numBall++;
				bingo.roller.balls.push(numBall);
			}
		},

		extractUniqueRandomNumberFromBalls: function() {
			var balls = bingo.roller.balls,
				min = 1,
				max = balls.length,
				randomIndex = Math.floor(Math.random() * (max - min)) + min,
				randomBall = balls[randomIndex];

			// Remove the extracted ball from the array to avoid get the same number again.
			balls.splice(randomIndex, 1);

			return randomBall;
		},

		showBallFromRoller: function() {
			var currentBall = bingo.roller.currentBall;
			console.log('\nThe ball extracted from the roller is number: ' + currentBall);
		}
	},

	game: {
		numTurns: 0,

		startNewGame: function() {
			bingo.roller.fillRollerWithBalls();
			bingo.game.nextTurn();
		},

		nextTurn: function() {
			bingo.game.numTurns++;
			bingo.roller.currentBall = bingo.roller.extractUniqueRandomNumberFromBalls();
			bingo.roller.showBallFromRoller();
			bingo.card.crossNumberInCardByBall();
		},

		askToContinueTheGame: function() {
			var askToContinueTheGame = prompt('Do you really want to continue with the game? \n' +
				'Say "yes" to continue, or "no" if you prefer to quit.');

			if (askToContinueTheGame && askToContinueTheGame.toLowerCase() === 'yes') {
				console.log('\nLet\'s continue with the game!');
				bingo.game.nextTurn();
			} else {
				console.log('\nOooh, we are sorry to hear that, you were so close!');
				bingo.game.endGame();
			}
		},

		askToPlayAnotherRound: function() {
			var askToPlayAnotherRound = prompt('Do you wish to play again? \n' +
				'Say "yes" to get a new card and start again, or "no" if you prefer to leave it here.');

			if (askToPlayAnotherRound && askToPlayAnotherRound.toLowerCase() === 'yes') {
				console.log('\nLet\'s start a new round!');
				bingo.init();
			} else {
				console.log('\nGood bye! We hope to see you soon.');
			}
		},

		showStatistics: function() {
			console.log('\nThis Bingo round was completed in ' + bingo.game.numTurns + ' turns.\n');
			console.log('\nYou have ' + bingo.game.calculatePoints() + ' points in total.\n');
		},

		endGame: function() {
			bingo.game.showStatistics();
			bingo.game.askToPlayAnotherRound();
		},

		explainPointsGame: function() {
			console.log('Welcome to Skylab Bingo, ' + bingo.user.usersList[0] + '\n' + 
				'We are happy to anounce our bingo points game!\n' +
				'You will get 100 points for every new game you start. ' + 
				'If you get to complete your bingo card in less than 30 turns you will keep all 100 points. ' +
				'From the 31st turn, you will lose some points every turn following the next rules:\n' + 
				'- From turn 31 to 40 you will lose 1 point in every turn.\n' + 
				'- From turn 41 to 50 you will lose 2 point each turn.\n' + 
				'- From turn 51 you will lose 3 point in every turn until the end of the game.\n' +
				'\n Good luck!'
				);
		},

		calculatePoints: function() {
			var numTurns = bingo.game.numTurns,
				points = 100;

			if (numTurns  >30 && numTurns <= 40) {
				points -= (numTurns - 30); //1 point less for every turn between 31 and 40
			} else if (numTurns > 40 && numTurns <= 50) {
				// 10 points less from the 31 to 40, and 2 points from 41 to before 50
				points -= (10 + 2*(numTurns - 40)); 
			} else if (numTurns > 50) {
				// 10 points less from the 31 to 40, 20 less from 41 to 50 and 3 less for every turn from 51
				points -= (30 + 3*(numTurns - 50)); 
			}

			if (points < 0) {
				points = 0;
			}

			return points;
		}
	},

	init: function() {
		bingo.user.saveUserName();
		bingo.game.explainPointsGame();
		bingo.card.getNewCard();
	}

}

bingo.init();
