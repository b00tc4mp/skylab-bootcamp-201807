// This is a example of array of objects... each position of array contains one object...
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
]
console.log(flights[0].to) //output: New York

//Se preguntará por el nombre de usuario y dará la bienvenida.
function askName() {
    var person = prompt ("Introduzca su nombre", "nombre");
    if (person != null) {
    	return "Hola " + person + "! Bienvenid@ al mejor comparador de vuelos!";
    } else {
    	return "Debes rellenar el nombre para continuar";
    }
}

//El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
function listFlights (){
	function scale(){
		if (flights.scale) {
			return "ninguna";
		} else {
			return "alguna";
		} //aqui no consigo que se vea cuando la escala es falsa la palabra "ninguna", y al reves la palabra "alguna"
	}
	flights.forEach(function (obj){
		console.log("El vuelo con origen " + obj.from + ", y destino " + obj.to + " tiene un coste de " + obj.cost + "€ y no realiza " + scale() + " escala.");
	})
}
console.log (listFlights());


//A continuación, el usuario verá el coste medio de los vuelos.
var acc = 0;
flights.forEach(function(obj){
	acc += obj.cost;
})
var avg = acc/flights.length;
console.log (avg);


//También podrá ver cuantos vuelos efectúan escalas.
function scaleCounter() {
	var counter = 0;
	flights.forEach(function(obj){
		if (obj.scale) {
			counter++;
		}
	})
	console.log("Hay " + counter + " vuelos con escalas");
}
console.log(scaleCounter());

//Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
function lastFive() {
			var emptyArray = [];
			var lastFiveFlights = flights.length - 5;
			for (var i=lastFiveFlights; i<flights.length; i++) {
				emptyArray.push(flights[i]["to"]);
			}
			return "Los últimos vuelos del día son con los siguientes destinos: " + emptyArray.join(", ");
		}
console.log(lastFive());