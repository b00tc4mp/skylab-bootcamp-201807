String.prototype.reverse = function() {
	var reversed = '';

	for (var i = this.length - 1; i >= 0; i--) {
		reversed += this[i];
    }

	return reversed;
};

"hola mundo".reverse()
// "odnum aloh"