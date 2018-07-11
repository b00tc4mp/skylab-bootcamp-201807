var hello = 'hello';

function salutator(from) {
	var salutation = from + ': ' + hello + ', ';

	return function(to) {
		return salutation + to + '!';
    };
}

var manuel = salutator('manuel');
manuel('fulanito'); // "manuel: hello, fulanito!"
hello = 'hola';
manuel('fulanito'); // "manuel: hello, fulanito!"

var robert = salutator('robert');
robert('pepita'); // "robert: hola, pepita!"

// ...

var hello = 'hello';

function salutator(from) {
	//var salutation = from + ': ' + hello + ', ';

	return function(to) {
		//return salutation + to + '!';
		return from + ': ' + hello + ', ' + to + '!';
    };
}

var manuel = salutator('manuel');
manuel('fulanito'); // "manuel: hello, fulanito!"
hello = 'hola';
manuel('fulanito'); // "manuel: hola, fulanito!"
