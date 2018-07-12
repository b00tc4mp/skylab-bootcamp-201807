Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
};

[1, 2, 3, 4, 5].random();
// 3