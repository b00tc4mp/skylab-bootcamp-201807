
/*
(Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
*/


//Creamos la funcion general skyLabAir

function skyLabAir(){

//Le pasamos los parametros con los que vamos a trabajar, en este caso 10 objetos

var flights = [
{id: 00, to: "New York", from: "Barcelona", cost: 700,scale: false},
{id: 01, to: "Los Angeles", from: "Madrid", cost: 1100,scale: true},
{id: 02, to: "Paris", from: "Barcelona", cost: 210,scale: false},
{id: 03, to: "Roma", from: "Barcelona", cost: 150,scale: false},
{id: 04, to: "London", from: "Madrid", cost: 200,scale: false},
{id: 05, to: "Madrid", from: "Barcelona", cost: 90,scale: false},
{id: 06, to: "Tokyo", from: "Madrid", cost: 1500,scale: true},
{id: 07, to: "Shangai", from: "Barcelona", cost: 800,scale: true},
{id: 08, to: "Sydney", from: "Barcelona", cost: 150,scale: true},
{id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false}
];

// Creamos una funcion donde pedimos el nombre de usuario y imprimimos el mismo con el mensaje de bienvenida

function askName(){

	var person = prompt("Please enter your name");

	if (person != null) {
    	console.log ("Hola " + person + " Bienvenid@ a Skylab Airlines!");
	}
}

askName();


//Creamos un forEach para que recorra el objeto y muestre los vuelos dependiendo de si tiene escala o no

function listOfFlights(infoFlights){
	console.log('A continuación le mostramos los vuelos:');

	infoFlights.forEach(function(obj){
		if(obj.scale === true){

			console.log('El vuelo de ' + obj.from + ' con destino a ' + obj.to + ' cuesta ' + obj.cost + ' lolales y tiene escala');

		}else{

			console.log('El vuelo de ' + obj.from + ' con destino a ' + obj.to + ' cuesta ' + obj.cost + ' lolales y no tiene escala');

		}
	});
}

listOfFlights(flights);

//Creamos una funcion para calcular el precio medio de los vuelos.

function averageCost(avCost){

	var sumCost = 0;
	
	avCost.forEach(function(cost){
		sumCost += cost.cost;
	});

	console.log('El coste medio de los vuelos es de ' + sumCost / avCost.length + ' lolales');

}

averageCost(flights);


//Creamos una funciona para imprimir el numero de vuelos con escala que existen y cuales son

function flightsWithScale(myObject){

	var withScales = [];
	var withOutScales = [];
	var nameFrom = [];
	var nameTo = [];

	for (prop in myObject){

		if (myObject[prop].scale === true) {
			withScales.push(+1);
			nameFrom.push(myObject[prop].from);
			nameTo.push(myObject[prop].to);
		} else {
			withOutScales.push(+1);
		}
	}
	
	console.log('Hay ' + withScales.length + ' vuelos con escala y son los siguientes:');
	
	for(var i=0;i<withScales.length;i++){
		 console.log('Vuelo con origen desde ' + nameFrom[i] + ' con destino ' + nameTo[i]);
	}
	
}

flightsWithScale(flights);

//Creamos una funcion que imprima los ultimos 5 vuelos del dia

function lastFlights(fiveLastFlights){

	var result = fiveLastFlights.slice(Math.max(fiveLastFlights.length - 5, 0));
	console.log('Los ultimos ' + result.length + ' vuelos del dia son: ');


	result.forEach(function(obj){
		console.log('El vuelo con origen ' + obj.from + ' y con destino ' + obj.to);
	});
}

lastFlights(flights);

}

skyLabAir();



/*
function seeFlights() {
    confirm("Quiere ver los vuelos para el dia de hoy ?");
if(seeFlights !== true){

console.log('Gracias por utilizar Skylab Airlines') 

break;

}else{
	
continue;
}
}

seeFlights()
*/
