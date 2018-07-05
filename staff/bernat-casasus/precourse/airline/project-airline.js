/*
- Demanar usuari
	If si donar benvinguda

- Visualizar todos los vuelos amigablemente: El vuel con origen: BARCELONA, y destino: MADRID  
	tiene un coste de XXX y no realiza (o si) ninguna escala.

- Coste medio de todos los costes.

- Numero de vuelos que efectuan escala.

- Mostrar destinos de los ultimo 5 dias.
*/
var flights = [
{id: 0, to: "New York", from: "Barcelona", cost: 700,scale: false},
{id: 1, to: "Los Angeles", from: "Madrid", cost: 1100,scale: true},
{id: 2, to: "Paris", from: "Barcelona", cost: 210,scale: false},
{id: 3, to: "Roma", from: "Barcelona", cost: 150,scale: false},
{id: 4, to: "London", from: "Madrid", cost: 200,scale: false},
{id: 5, to: "Madrid", from: "Barcelona", cost: 90,scale: false},
{id: 6, to: "Tokyo", from: "Madrid", cost: 1500,scale: true},
{id: 7, to: "Shangai", from: "Barcelona", cost: 800,scale: true},
{id: 8, to: "Sydney", from: "Barcelona", cost: 150,scale: true},
{id: 9, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false}
]

function start(){

	var answer = prompt("Introduce your username:");
	if(answer === "bernat"){
		console.log("¡Bienvenido "+answer+" esta es tu informacion!");
		console.log(" ");
		viewAllFlights(flights);
		costAverage(flights);
		flightsWithSacle(flights);
		lastFiveFlights(flights);

	}else{
		console.log("Nombre de usuario incorrecto. Vuelva a intentarlo.");
		console.log(" ");
		start();
	}

}

function viewAllFlights(object){
	object.forEach(function(obj){
		if(obj.scale === true){
			console.log("El vuelo con origen: "+obj.from+", y destino: "+obj.to+" tiene un coste de "+obj.cost+" y realiza escala.");
		}else{
			console.log("El vuelo con origen: "+obj.from+", y destino: "+obj.to+" tiene un coste de "+obj.cost+" no realiza ningua escala.");

		}
	})
	
	console.log(" ");
}  

function costAverage(object){
		var ant = 0;
		var count = 0;
		object.forEach(function(obj){

			ant += obj.cost;
			count++;

	})
		console.log("El precio medio por vuelo es de "+ant/count);
		
}

function flightsWithSacle(object){
	var count = 0;
	object.forEach(function(obj){
		if(obj.scale === true){
			count++;
			}
	})

	console.log("El numero de vuelos que hace escala es de: "+count);
}

function lastFiveFlights(object){
		var objLength = object.length-5;
		var arrayDestinations = [];
		object.forEach(function(obj){

		if(obj.id === objLength){
			objLength++;
			arrayDestinations.push(obj.to);
			}
	})

		console.log("Los destinos de los ultimos cinco dias son : "+arrayDestinations.join(", "));
}

start();