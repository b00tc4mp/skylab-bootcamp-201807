// Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject) {
    for (let key in myObject) {
        console.log(key);
    }
}
properties(jellyfish);

//name, class, id
//b) Ahora, crea una función que liste solo los valores de las propiedades.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject) {

    for (let prop in myObject) {
        console.log(myObject[prop]);
    }
}

properties(jellyfish);

//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChange) {

    for (let prop in myObject) {
        myObject.type = toChange;
        console.log(myObject[prop]);
    }
}

properties(jellyfish, 'No Venenosa');

//d) Ahora, elimina la propiedad ID y asegura los cambios.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId) {

    for (let prop in myObject) {

        myObject.type = toChangeType;
        myObject.id = toChangeId;

        console.log(myObject[prop]);
    }
}

properties(jellyfish, 'No Venenosa', 3);

//e) Añade una nueva propiedad, por ejemplo city y dale un valor.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;
    for (let prop in myObject) {
        console.log(myObject[prop]);
    }
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico');

//e1) Asegura los cambios solo imprimiendo esa nueva propiedad.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;

    console.log(myObject.region);

}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico');

//f) Lista el numero de propiedades que contiene el objeto.
var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;
    howManyItems = Object.keys(myObject);

    console.log('There are ' + howManyItems.length + ' info fields');
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico');

//g) Cambia la propiedad name por fullName.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region, oldValue, newValue) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;

    myObject[newValue] = myObject[oldValue];
    delete myObject[oldValue];
    console.log(myObject);
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico', 'name', 'fullname');

//g1) Asegura los cambios.

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region, oldValue, newValue) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;
    myObject[newValue] = myObject[oldValue];
    delete myObject[oldValue];
    console.log(myObject.fullname);
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico', 'name', 'fullname');


//h) Lista todas las propiedades del objeto a través de un console.log()
var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region, oldValue, newValue) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;
    myObject[newValue] = myObject[oldValue];
    delete myObject[oldValue];
    console.log('Hi, im a ' + myObject.fullname + " i'm " + myObject.type + " and live in " + myObject.region);
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico', 'name', 'fullname');

//h1) Añade más propiedades al objeto, como...markAverage, country, job, studies...

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region, oldValue, newValue, color, numTentacles) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;
    myObject.color = color;
    myObject.number_of_tentacles = numTentacles;
    myObject[newValue] = myObject[oldValue];
    delete myObject[oldValue];
    console.log(myObject);
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico', 'name', 'fullname', 'morado', 15);

//h2) Asegura los cambios volviendo a listar los valores del objeto

var jellyfish = {
    name: "Ortiga",
    type: "Venenosa",
    id: 1
};

function properties(myObject, toChangeType, toChangeId, region, oldValue, newValue, color, numTentacles) {

    myObject.type = toChangeType;
    myObject.id = toChangeId;
    myObject.region = region;
    myObject.color = color;
    myObject.number_of_tentacles = numTentacles;
    myObject[newValue] = myObject[oldValue];
    delete myObject[oldValue];
    for (key in myObject) {
        console.log(key + ' => ' + myObject[key]);
    }
}

properties(jellyfish, 'No Venenosa', 3, 'Océano Pacífico', 'name', 'fullname', 'morado', 15);

//i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}
var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var hulk = new avenger('Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 10);
console.log(hulk);

//j) Crea otro objeto y imprime sus propiedades por pantalla.

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}
var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var hulk = new avenger('Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 10);
console.log(hulk);

//k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. .Example of property:

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
    this.listproperties = function (name) {

        for (key in name) {
            console.log(name[key]);
        }
    };
}
var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10),
    hulk = new avenger('Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 10);

hulk.listproperties(hulk);

//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}

var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var hulk = new avenger('Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 10);

function allNames() {
    var nameArray = [tonyStark, hulk];
    nameArray.forEach(function (obj) {
        console.log(obj.fullName);
    });
}
allNames();

//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.

var result = [];

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}

var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var hulk = new avenger('Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 10);
var minion = new avenger('Alejandro Delgado', "V", "LA", "Developer", "Skylab", 3);
var dinosaur = new avenger('Carlos Ramos', "III", "NYC", "Developer", "Skylab", 1);
var theBoss = new avenger('David Monreal', "I", "NYC", "devOps", "Skylab", 0);

var arrayHeroes = [tonyStark, hulk, minion, dinosaur, theBoss];

function equalCity(obj) {
    return obj.city === 'NYC';
}
var cityFilter = arrayHeroes.filter(equalCity);

for (key in cityFilter) {
    result.push(cityFilter[key].fullName);
}
console.log('Are ' + cityFilter.length + ' avengers living in ' + cityFilter[key].city + ': ' + result.join(', '));

//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.

var sumMarkAv = 0;

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}

var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var hulk = new avenger('Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 10);
var minion = new avenger('Alejandro Delgado', "V", "LA", "Developer", "Skylab", 3);
var dinosaur = new avenger('Carlos Ramos', "III", "NYC", "Developer", "Skylab", 1);
var theBoss = new avenger('David Monreal', "I", "NYC", "devOps", "Skylab", 2);
var theBest = new avenger('Gerard Baste', "II", "NYC", "devOps", "Skylab", 7);

var arrayHeroes = [tonyStark, hulk, minion, dinosaur, theBoss, theBest];

arrayHeroes.forEach(function (obj) {
    sumMarkAv += obj.markAv;
});

console.log(sumMarkAv / arrayHeroes.length);

//ñ) Ahora, crea una funcion que recoja los avengers en parejas(será necesario que tengan un id, por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.
var testArray = [];

function avenger(id, fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}

var tonyStark = new avenger(1, "Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var hulk = new avenger(2, 'Jaume Sarradell', "VI", "LA", "Developer", "Skylab", 9);
var minion = new avenger(3, 'Alejandro Delgado', "V", "LA", "Developer", "Skylab", 3);
var dinosaur = new avenger(4, 'Carlos Ramos', "III", "NYC", "Developer", "Skylab", 1);
var theBoss = new avenger(5, 'David Monreal', "I", "NYC", "devOps", "Skylab", 2);
var theBest = new avenger(6, 'Gerard Baste', "II", "NYC", "devOps", "Skylab", 7);

var arrayHeroes = [tonyStark, hulk, minion, dinosaur, theBoss, theBest];


for (var i = 0; i < arrayHeroes.length; i++) {

    testArray.push([arrayHeroes[i], arrayHeroes[i + 1]]);
    i++;
}

for (var j = 0; j < testArray.length; j++) {

    console.log(Math.max(testArray[j][0].markAv, testArray[j][1].markAv));

    if (testArray[j][0].markAv < testArray[j][1].markAv) {
        console.log(testArray[j][0].fullName + ' vs ' + testArray[j][1].fullName + ' => ' + testArray[j][1].fullName + ' is better');
    } else {
        console.log(testArray[j][0].fullName + ' vs ' + testArray[j][1].fullName + ' => ' + testArray[j][0].fullName + ' is better');
    }
}
// HawkEye vs Tony => Tony is better! \n Thor vs Hulk => Hulk is better! \n Vision vs Captain America => Vision is better

//ñ1) Intenta crear las parejas de forma aleatoria.

//Hint => https: //developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random