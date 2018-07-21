function skyLabAir(){

//pasamos los vuelos

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

// preguntamos el nombre y printmos la bienvenida

function nombre(){

	var persona = prompt("Hola, como te llamas?");

	if (persona != null) {
    	console.log ("Hola " + persona + " Bienvenido a Skylab Airlines!");
	}
}

nombre();


//Mostramos los vuelos dependiendo de si tiene escala o no

function listOfFlights(flights){	
console.log('A continuación le mostramos los vuelos:')

	flights.forEach(function(obj){
		if(obj.scale === true){

			console.log('El vuelo de ' + obj.from + ' con destino a ' + obj.to + ' cuesta ' + obj.cost + ' euros y tiene escala')

		}else{

			console.log('El vuelo de ' + obj.from + ' con destino a ' + obj.to + ' cuesta ' + obj.cost + ' euros y no tiene escala')

		}
	});
}

listOfFlights(flights);

//calculamos precio medio

function averageCost(average){

	var sum = 0
	
	average.forEach(function(cost){
		sum =sum + cost.cost;
	});

	console.log('El coste medio de los vuelos es de ' + sum / average.length + ' euros');

}

averageCost(flights);


//Creamos una funciona para imprimir el numero de vuelos con escala que existen y cuales son

function flightsWithScale(myObject){
	var escala=0;
	flights.forEach(function(obj){
		if(obj.scale === true){

			escala++;
		}
	});
	console.log(escala + " vuelos hacen escala");
	
}

flightsWithScale(flights);

//Creamos una funcion que imprima los ultimos 5 vuelos del dia

function lastFlights(flights){

	for (var i=0; i<5; i++){
		console.log(flights[i].to);
		
	}
}

lastFlights(flights);

}

skyLabAir();