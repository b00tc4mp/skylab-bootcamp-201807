
var buttonsData = getButtonsData();
var calculator = initializeCalculator();
var displayElem = document.querySelector('#display');
var displayValueElem = display.children[0];
var buttonsElem = document.querySelectorAll('#keypad button');

for (var buttonElem of buttonsElem) {
  buttonElem.addEventListener('click', handleClickButtonElem);
}

function initializeCalculator() {
  return {
    displayValueToClean: true,
    operatorToCalculate: '',
    internalValue: '0',
    hasCalculateOperator: false,
  };
}

function getButtonsData() {
  return [
    { name: 'clean', digit: '', type: 'clean' },
    { name: 'negate', digit: '', type: 'negate' },
    { name: 'percent', digit: '', type: 'percent' },
    { name: 'divide', digit: '', type: 'operator' },
    { name: 'multiply', digit: '', type: 'operator' },
    { name: 'subtract', digit: '', type: 'operator' },
    { name: 'sum', digit: '', type: 'operator' },
    { name: 'equals', digit: '', type: 'equals' },
    { name: 'zero', digit: '0', type: 'number' },
    { name: 'one', digit: '1', type: 'number' },
    { name: 'two', digit: '2', type: 'number' },
    { name: 'three', digit: '3', type: 'number' },
    { name: 'four', digit: '4', type: 'number' },
    { name: 'five', digit: '5', type: 'number' },
    { name: 'six', digit: '6', type: 'number' },
    { name: 'seven', digit: '7', type: 'number' },
    { name: 'eight', digit: '8', type: 'number' },
    { name: 'nine', digit: '9', type: 'number' },
    { name: 'point', digit: '.', type: 'point' },
  ];
}

function getButtonDataByName(name) {
  var buttonDataFound = null;
  // var buttonsData = getButtonsData();
  for (var buttonData of buttonsData) {
    if (buttonData.name === name) {
      buttonDataFound = buttonData;
    }
  }
  return buttonDataFound;
}

function cleanDisplayValueElem() {
  displayValueElem.innerText = '';
}

function isDisplayValueElemToClean() {
  return calculator.displayValueToClean;
}

function isZeroDisplayValueElem() {
  return (displayValueElem.innerText === '0');
}

function hasPointDisplayValueElem() {
  return displayValueElem.innerText.indexOf('.') !== -1;
}

function addDigitToDisplayValueElem(digit) {
  if (displayValueElem.innerText.length < 8) {
    displayValueElem.innerText = displayValueElem.innerText.concat(digit);
  }
}

function sum(value1, value2) {
  return value1 + value2;
}

function subtract(value1, value2) {
  return value1 - value2;
}

function multiply(value1, value2) {
  return value1 * value2;
}

function divide(value1, value2) {
  return value1 / value2;
}

function negate(value) {
  return value * -1;
}

function percent(value) {
  return value / 100;
}

function calculateOperator(value1, value2, operator) {
  var result = 0;
  switch (operator) {
    case 'sum':
      result = sum(value1, value2);
      break;
    case 'subtract':
      result = subtract(value1, value2);
      break;
    case 'multiply':
      result = multiply(value1, value2);
      break;
    case 'divide':
      result = divide(value1, value2);
      break;
  }
  return result;
}

function valueToCalculate(value) {
  return Number(value);
}

function valueToDisplay(value) {
  return value.toString().substr(0, 8);
}

// function handleNumberButton(buttonData) {
//   if (isDisplayValueElemToClean() || isZeroDisplayValueElem()) {
//     cleanDisplayValueElem();
//     calculator.displayValueToClean = false;
//   }
//   calculator.hasCalculateOperator = true;
//   addDigitToDisplayValueElem(buttonData.digit);
// }

function handleClickNumberButtonElem(event) {
  var buttonElem = event.target;
  var buttonData = getButtonDataByName(buttonElem.name);

  if (isDisplayValueElemToClean() || isZeroDisplayValueElem()) {
    cleanDisplayValueElem();
    calculator.displayValueToClean = false;
  }
  calculator.hasCalculateOperator = true;
  addDigitToDisplayValueElem(buttonData.digit);
}

function handleClickPointButtonElem(event) {
  var buttonElem = event.target;
  var buttonData = getButtonDataByName(buttonElem.name);

  if (isDisplayValueElemToClean()) {
    cleanDisplayValueElem();
    calculator.displayValueToClean = false;
    addDigitToDisplayValueElem('0' + buttonData.digit);
  }
  else {
    if (hasPointDisplayValueElem() === false) {
      addDigitToDisplayValueElem(buttonData.digit);
    }
  }
}

function handleClickOperatorButtonElem(event) {
  var buttonElem = event.target;
  var buttonData = getButtonDataByName(buttonElem.name);
  fade(displayValueElem);

  if (calculator.hasCalculateOperator) {
    calculator.displayValueToClean = true;
    if (calculator.operatorToCalculate) {
      var value1 = valueToCalculate(calculator.internalValue);
      var value2 = valueToCalculate(displayValueElem.innerText);
      var operator = calculator.operatorToCalculate;
      var result = calculateOperator(value1, value2, operator);
      result = isFinite(result) === true ? result : 'Error';
      calculator.internalValue = valueToDisplay(result);
    }
    else {
      calculator.internalValue = displayValueElem.innerText;
    }
    calculator.hasCalculateOperator = false;
  }

  calculator.operatorToCalculate = buttonData.name;
  updateDisplayValue(calculator.internalValue);
}

function handleClickNegateButtonElem(event) {
  var value = valueToCalculate(displayValueElem.innerText);
  fade(displayValueElem);
  result = negate(value);
  calculator.internalValue = valueToDisplay(result);
  updateDisplayValue(calculator.internalValue);
}

function handleClickPercentButtonElem(event) {
  var buttonElem = event.target;
  var value = valueToCalculate(displayValueElem.innerText);
  fade(displayValueElem);
  result = percent(value);
  calculator.internalValue = valueToDisplay(result);
  updateDisplayValue(calculator.internalValue);
}

function handleClickEqualsButtonElem(event) {
  var buttonElem = event.target;
  var buttonData = getButtonDataByName(buttonElem.name);
  fade(displayValueElem);
  calculator.displayValueToClean = true;

  if (calculator.operatorToCalculate) {
    var value1 = valueToCalculate(calculator.internalValue);
    var value2 = valueToCalculate(displayValueElem.innerText);
    var operator = calculator.operatorToCalculate;
    var result = calculateOperator(value1, value2, operator);
    result = isFinite(result) === true ? result : 'Error';
    calculator.internalValue = valueToDisplay(result);
  }
  else {
    calculator.internalValue = displayValueElem.innerText;
  }

  calculator.operatorToCalculate = '';
  updateDisplayValue(calculator.internalValue);
}

function handleClickCleanButtonElem(event) {
  var buttonElem = event.target;
  fade(displayValueElem);
  calculator = initializeCalculator();
  updateDisplayValue(calculator.internalValue);
}

function updateDisplayValue(value) {
  displayValueElem.innerText = value;
}

function fade(element) {
  element.classList.add('hide');
  setTimeout(function() {
    element.classList.remove('hide');
  }, 100);
}

function handleClickButtonElem(event) {
  var buttonElem = event.target;
  var buttonData = getButtonDataByName(buttonElem.name);
  switch (buttonData.type) {
    case 'number':
      handleClickNumberButtonElem(event);
      break;
    case 'point':
      handleClickPointButtonElem(event);
      break;
    case 'operator':
      handleClickOperatorButtonElem(event);
      break;
    case 'negate':
      handleClickNegateButtonElem(event);
      break;
    case 'percent':
      handleClickPercentButtonElem(event);
      break;
    case 'equals':
      handleClickEqualsButtonElem(event);
      break;
    case 'clean':
      handleClickCleanButtonElem(event);
      break;
  }
}