
// BINGO GAME! 🎲🎰
// Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador 
// y deberá guardarse. Durante el primer turno se mostrará un cartón con 15 números 
// (excluyendo el 0 siempre), para pasar al siguiente turno el usuario deberá confirmar mediante
//  confirm() visualizándose otro número, si coincide con alguno de los existentes en el cartón, 
// cambiará por una "X" o un 0. El cartón se mostrará, al final de cada turno, con los cambios 
// efectuados, indicándole al usuario qué número se ha encontrado. El programa deberá preguntar 
// al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, seguirá el 
// mismo patrón que hasta el momento.

// Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje 
// "LINEA!", pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

// Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón.
//  Por último, deberá preguntar si desea volver a jugar.


function dialog(message, initial) {
  // @TODO: controlar initial como parametro opcional
  var response = prompt(message, initial);
  if (response) response = response.trim();
  return (response) ? response : '';
}

function askPlayerName() {
  var name = '';
  do {
    name = dialog('Introduce tu nombre por favor');
  }
  while (!name);
  return name;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumberByNumColumn(numColumn) {
  var rangeColumn = [
    {numColumn: 1, min:  1, max: 15},
    {numColumn: 2, min: 16, max: 30},
    {numColumn: 3, min: 31, max: 45},
    {numColumn: 4, min: 46, max: 60},
    {numColumn: 5, min: 61, max: 75},
  ];
  var randomNumber = null;
  for (range of rangeColumn) {
    if (range.numColumn === numColumn) {
      randomNumber = getRandomNumber(range.min, range.max);
    }
  }
  return randomNumber;
}

/**
 * @url: https://es.wikipedia.org/wiki/Bingo 
 */
function generateCard() {

  var numRows = 5;
  var numColumns = 5;
  var usedNumbers = [];
  var card = {
    info: {numRows: numRows, numColumns: numColumns, minNum: 1, maxNum: 75, numLineas: 0, isBingo: false},
    boxes: []
  };

  for (numRow = 1; numRow <= numRows; numRow++) {
    for (numColumn = 1; numColumn <= numColumns; numColumn++) {
      var number = 0, newNumber = false;
      do {
        number = getRandomNumberByNumColumn(numColumn);
        if (usedNumbers.indexOf(number) === -1) {
          usedNumbers.push(number);
          newNumber = true;
        }
      }
      while (newNumber === false);

      var box = {numRow: numRow, numColumn: numColumn, number: number, matched: false};
      card.boxes.push(box);
    }
  }

  return card;
}

function formatValue(value) {
  var valueFormatted = '',
      value = value.toString(),
      spaces = 3 - value.length;
  for (i = 0; i < spaces; i++) {
    valueFormatted += ' ';
  }
  valueFormatted += value;
  return valueFormatted;
}

function getRowCard(card, numRow) {
  var row = [],
      boxes = card.boxes;
  for (box of boxes) {
    if (box.numRow === numRow) {
      row.push(box);
    }
  }
  return row;
}

function getColumnCard(card, numColumn) {
  var column = [],
      boxes = card.boxes;
  for (box of boxes) {
    if (box.column === numColumn) {
      column.push(box);
    }
  }
  return column;
}

function printRowCard(row) {
  var msgBoxes = [];
  for (box of row) {
    var value = (box.matched === true) ? 'X' : box.number;
    msgBoxes.push(formatValue(value));
  }
  console.log(msgBoxes.join(' '));
}

function printCard(card) {
  // header
  console.log(' B   I   N   G   O ');
  console.log('--- --- --- --- ---');
  // body
  var numRows = card.info.numRows;
  var row = [];
  for (numRow = 1; numRow <= numRows; numRow++) {
    row = getRowCard(card, numRow);
    printRowCard(row);
  }
}

function askContinueTurn(turn) {
  return confirm('¿Deseas pasar al siguiente turno? \nNº Turno: ' + turn.number + '\nBombo: ' + turn.randonNumber);
}

function matchNumberInCard(number, card) {
  var foundBox = null;
  var boxes = card.boxes;
  for (box of boxes) {
    if (box.number === number) { 
      box.matched = true;
      foundBox = box;
      break;
    }
  }
  return foundBox;
}

function isLinea(card, numRow) {
  var row = getRowCard(card, numRow);
  var isHorizontalLinea = true;
  for (box of row) {
    if (box.matched === false) {
      isHorizontalLinea = false;
      break;
    }
  }
  return isHorizontalLinea;
}

function isBingo(card) {
  var numRows = card.info.numRows;
  var isBingo = true;
  for (numRow = 1; numRow <= numRows; numRow++) {
    if (isLinea(card, numRow) === false) {
      isBingo = false;
    }
  }
  return isBingo;
}

function numberInNumbers(number, numbers) {
  var inNumbers = false;
  if (numbers.indexOf(number) !== -1) {
    inNumbers = true;
  }
  return inNumbers;
}

function match() {

  var card = generateCard();
  console.log('\nCarton:');
  printCard(card);

  var turns = [];
  var randomNumbers = [];
  var endMatch = false;
  var isBingoCard = false;
  var i = 0;
  while (endMatch === false) {
    
    // numero bombo
    var randomNumber = 0;
    do {
      randomNumber = getRandomNumber(card.info.minNum, card.info.maxNum);
    }
    while (numberInNumbers(randomNumber, randomNumbers) === true);
    randomNumbers.push(randomNumber);

    // historial turnos
    var turn = {number: i += 1, randonNumber: randomNumber};
    turns.push(turn);

    // pregunta turno
    if (askContinueTurn(turn) === true) {

      var boxMatched = matchNumberInCard(turn.randonNumber, card);

      console.log('\nTurno ' + turn.number);
      printCard(card);

      if (boxMatched) {
        if (isLinea(card, boxMatched.numRow)) {
          console.log('\nLINEA!');
        }
        if (isBingo(card)) {
          console.log('\nBINGO!!!');
          isBingoCard = true;
          endMatch = true;
        }
      }
    } else {
      endMatch = true;
    }
  }
  if (isBingoCard) {
    console.log('\nNumero total de turnos: ' + turns.length);
  }
  return isBingoCard;
}

function askPlayAgain() {
  return confirm('¿Deseas volver a jugar?');
}

function bingo() {
  
  var name = askPlayerName();
  console.log('\nJugador: ' + name);

  var playAgain = false;
  do {
    var isBingoCard = match();
    if (isBingoCard === true) {
      playAgain = askPlayAgain();
    }
  } while (playAgain === true);

  console.log('\nCiao!');
}

bingo();
