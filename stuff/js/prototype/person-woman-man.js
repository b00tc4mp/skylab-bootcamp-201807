function Person(name, surname) {
	if (typeof name !== 'string' || !name.length) throw Error('name cannot be ' + name);
	if (typeof surname !== 'string' || !surname.length) throw Error('surname cannot be ' + surname);

	this.name = name;
	this.surname = surname;
	this.date = new Date();
}

Person.prototype.eat = function() { return 'ñam ñam...'; };
Person.prototype.poo = function() { return 'plof plof...'; };

function Woman(name, surname) {
	//if (typeof name !== 'string' || !name.length) throw Error('name cannot be ' + name);
	//if (typeof surname !== 'string' || !surname.length) throw Error('surname cannot be ' + surname);

	//this.name = name;
	//this.surname = surname;
	//this.date = new Date();

	Person.call(this, name, surname);
}

//Woman.prototype = new Person();
Woman.prototype = Object.create(Person.prototype); // new Person();
Woman.prototype.constructor = Woman;
Woman.prototype.gender = 'female';

Woman.prototype.birth = function() { return 'AGAGGGARRRRRRRR....'; };

function Man(name, surname) {
	//if (typeof name !== 'string' || !name.length) throw Error('name cannot be ' + name);
	//if (typeof surname !== 'string' || !surname.length) throw Error('surname cannot be ' + surname);

	//this.name = name;
	//this.surname = surname;
	//this.date = new Date();

	Person.call(this, name, surname);
}

//Man.prototype = new Person();
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;
Man.prototype.gender = 'male';

Man.prototype.stopThinking = function() { return 'i am now in my nothing box'; };


var w = new Woman('Anna', 'Doe');
console.log(w.birth());
console.log(w.eat());
console.log(w.gender);

var m = new Man('John', 'Doe');
console.log(m.stopThinking());
console.log(m.poo());
console.log(m.gender);

