1//Se preguntará por el nombre de usuario y dará la bienvenida.
2//El usuario visualizará todos los vuelos disponibles de una forma amigable: 
//El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
3//A continuación, el usuario verá el coste medio de los vuelos.
4//También podrá ver cuantos vuelos efectúan escalas.
5//Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

var flights = [
{id: 00, to: "New York", from: "Barcelona", cost: 700,scale: true},
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

var name = "";

function askNameWelcome(){
	name = prompt("Por favor introduzca su nombre"); 
	alert("Hola " + name + " Bienvenid@ a Skylab Airlines!");
};

/*function scales(){
	if (flights.scale == true) {
		return true;
	}
	else if (flights.scale == false){
		return false;
	}
};*/

var vuelos = [];

function displayFlightsFriendly(){
	flights.forEach(function(obj,i){
		if(flights[i].scale == true){
			vuelos.push("El vuelo con origen: " + obj.from + ", y destino: " + obj.to + " tiene un coste de " + obj.cost + " € y realiza escala." + "\n")
		}
		else{
			vuelos.push("El vuelo con origen: " + obj.from + ", y destino: " + obj.to + " tiene un coste de " + obj.cost + " € y no realiza ninguna escala." + "\n")
		}	
	})
	alert(vuelos);
}

var precioTotal = 0;

function displayAveragePrice(){
	flights.forEach(function(obj){
		precioTotal += obj.cost;
	})
	alert("El precio medio de los vuelos es de: " + precioTotal/flights.length + " €");
};

	var vuelosConEscala = 0;

function displayScales(){
	flights.forEach(function(obj){
		if(obj.scale == true){vuelosConEscala++};
	})
	alert("Hay "+vuelosConEscala+" vuelos con escala");
};

var destinosDeHoy = [];

function todayFlights(){
	flights.forEach(function(obj){
		if(obj.id > (flights.length - 6)){
			destinosDeHoy.push(obj.to);
		}
	});

alert("El destino de los vuelos de hoy son a: "+destinosDeHoy.join(", "));
};




function skylabAirlines (){
	
	askNameWelcome();
	/*scales();*/
	displayFlightsFriendly();
	displayAveragePrice();
	displayScales();
	todayFlights();

};


skylabAirlines();