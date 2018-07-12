function Person(name, surname) {
    if (typeof name !== 'string' || !name.length) throw Error('name cannot be ' + name);
    if (typeof surname !== 'string' || !surname.length) throw Error('surname cannot be ' + surname);

    this.name = name;
    this.surname = surname;
    this.date = new Date();
}

Person.prototype.eat = function () { return 'ñam ñam...'; };
Person.prototype.poo = function () { return 'plof plof...'; };

function Woman(name, surname) {
    //if (typeof name !== 'string' || !name.length) throw Error('name cannot be ' + name);
    //if (typeof surname !== 'string' || !surname.length) throw Error('surname cannot be ' + surname);

    //this.name = name;
    //this.surname = surname;
    //this.date = new Date();

    Person.call(this, name, surname);

    this.numOfBirths = 0;
}

//Woman.prototype = new Person();
Woman.prototype = Object.create(Person.prototype); // new Person();
Woman.prototype.constructor = Woman;
Woman.prototype.gender = 'female';

Woman.prototype.birth = function () { return 'AGAGGGARRRRRRRR....'; };

function Man(name, surname) {
    //if (typeof name !== 'string' || !name.length) throw Error('name cannot be ' + name);
    //if (typeof surname !== 'string' || !surname.length) throw Error('surname cannot be ' + surname);

    //this.name = name;
    //this.surname = surname;
    //this.date = new Date();

    Person.call(this, name, surname);

    this.numOfProstateReviews = 0;
}

//Man.prototype = new Person();
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;
Man.prototype.gender = 'male';

Man.prototype.stopThinking = function () { return 'i am now in my nothing box'; };


var anna = new Woman('Anna', 'Doe');
// console.log(anna.birth());
// console.log(anna.eat());
// console.log(anna.gender);

var john = new Man('John', 'Doe');
// console.log(john.stopThinking());
// console.log(john.poo());
// console.log(john.gender);

var peter = new Man('Peter', 'Jackson');
peter.numOfProstateReviews = 2;

var sandy = new Woman('Sandy', 'Garcia');
sandy.numOfBirths = 3;

var eva = new Woman('Eva', 'Doe');
eva.numOfBirths = 5;

var jack = new Man('Jack', 'Sparrow');
jack.numOfProstateReviews = 11;

var maria = new Woman('Maria', 'Carei');
maria.numOfBirths = 3;

var paca = new Woman('Paca', 'Perez');
paca.numOfBirths = 9;

var alex = new Man('Alex', 'Borrito');
alex.numOfProstateReviews = 4;

var paulo = new Man('Paulo', 'Coelo');
paulo.numOfProstateReviews = 6;

var persons = [anna, john, peter, eva, jack, maria, paca, alex, paulo];

function getStatistics(persons) {
    var result = { 
        // numOfPatients: 0, 
        females: 0, 
        males: 0, 
        numOfBirths: 0, 
        numOfProstateReviews: 0,
        // get numOfPatients() {
        //     return this.females + this.males;
        // }
        numOfPatients: function() {
            return this.females + this.males;
        } 
    };

    for (var i = 0; i < persons.length; i++) {
        var person = persons[i];

        if (!(person instanceof Person)) throw Error('person is not a Person ' + person);

        // result.numOfPatients++;

        // if (person.gender === 'female') result.female++;
        // else result.male++;

        if (person instanceof Woman) {
            result.females++;
            result.numOfBirths += person.numOfBirths;
        }

        if (person instanceof Man) {
            result.males++;
            result.numOfProstateReviews += person.numOfProstateReviews;
        }
    }

    return result;
}

var stats = getStatistics(persons);

//console.log(stats.numOfPatients);
console.log(stats.numOfPatients());

