

// Haz una calculadora. Un único programa al que le pasarás dos parámetros y el
// usuario podrá visualizar por consola la suma, resta, multiplicación y división
// entre ambos números. El resultado debería ser mostrado con 3 decimales como
// mucho (En caso de que hubieran). El programa debe contemplar y actuar correctamente
// en el caso de que el usuario introduzca cualquier cosa que no sean números.

// Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada,
// si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
// Los resultados deberían almacenarse dentro de una array y mostrarlos de una
// forma amigable al usuario.
// Hint_ => results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]

function formatNumberResult(number) {
  return (number % 1 === 0) ? number : number.toFixed(3);
}

function isNumber(value) {
  var isNumber = true;
  if (typeof value === 'undefined') {
    isNumber = false;
  }
  if (isNaN(value)) {
    isNumber = false;
  }
  return isNumber;
}

function printInvalidNumbers(invalidNumbers) {
  console.log('Some of your parameters is not a number');
  for (invalidNumber of invalidNumbers) {
    console.log('Value ' + invalidNumber.value + ' in parameter ' + invalidNumber.numArg);
  }
}

function operations(number1, number2) {

  var operations = [
    {sign: '+', name: 'sum'},
    {sign: '-', name: 'sub'},
    {sign: '*', name: 'mult'},
    {sign: '/', name: 'div'},
  ];
  var calculatedNumbers = {
    sum: number1 + number2,
    sub: number1 - number2,
    mult: number1 * number2,
    div: number1 / number2
  };

  var msgResults = [];
  for (operation of operations) {
    var calculated = formatNumberResult(calculatedNumbers[operation.name]);
    var msg = `${number1} ${operation.sign} ${number2} = ${calculated}`;
    msgResults.push(msg);
  }

  console.log('The results of your numbers are: ' + msgResults.join(', '));
}

function squareRoot(number) {
  console.log('A single parameter introduced. Calculating square root...');
  console.log('The square root of your number is ' + formatNumberResult(Math.sqrt(number)));
}

function calculator(number1, number2) {  
  if (arguments.length === 0) {
    console.log('At least one parameter must be entered');
  }
  else if (arguments.length === 1) {
    var number = arguments[0];
    if (!isNumber(number)) {
      printInvalidNumbers([{ numArg: 1, value: number }]);
    }
    else {
      squareRoot(number);
    }
  }
  else {
    var invalidNumbers = [];
    for (var i = 0; i < arguments.length; i++) {
      var number = arguments[i];
      var numArg = i + 1;
      if (!isNumber(number)) {
        invalidNumbers.push({ numArg, value: number });
      }
    }
    if (invalidNumbers.length) {
      printInvalidNumbers(invalidNumbers);
    }
    else {
      operations(arguments[0], arguments[1]);
    }
  }
}

