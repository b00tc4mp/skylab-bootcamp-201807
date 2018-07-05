//c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá a varias letras. Podéis seguir el 
//esquema que esta en el github.

var dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
}

function script(word) {

	var result = [];

	for (var i=0; i<word.length; i++) {
		for (var key in dictionary) {
			var inArray = dictionary[key].indexOf(word[i])

			if (inArray != -1) {
				result.push(key)
			}
		}
	}

	console.log(result.join(""));
}

script('JAVIER');
