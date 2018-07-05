//Se preguntará por el nombre de usuario y dará la bienvenida.
//El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
//A continuación, el usuario verá el coste medio de los vuelos.
//También podrá ver cuantos vuelos efectúan escalas.
//Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

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

function airlinesProg(myObject) {
	
	var separador = "- - - - - - - - -";

	// Pedimos mediante prompt el nombre
	var userName = prompt("Please enter your name");

	//Verificación de los datos introducidos en el prompt
	if (userName === "") {
		console.log("Porfavor, escribe tu nombre");
		console.log("Stop program")
	} else {
		
		//Function para mostrar un saludo depende de la hora del dia
		function dayHour() {
			var currentTime = new Date();
			var salutation = "";
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();
			if (hours < 10) {
				hours = "0" + hours;
			}

			if (minutes < 10) {
				minutes = "0" + minutes;
			}

			var fullTime = hours + ":" + minutes;

		  	if ((fullTime >= "05:00") && (fullTime <= "13:59")) {
		  		salutation = "Buenos dias ";
		  	} else if ((fullTime >= "14:00") && (fullTime <= "20:00")) {
		  		salutation = "Buenas tardes ";
		  	} else {
		  		salutation = "Buenas noches ";
		  	}
			
			return salutation;
		}

		var resultTime = dayHour();
		
		console.log(resultTime + userName + ". Bienvenido a Skylab Airlines!");
		console.log(separador);
		console.log("Buscando vuelos...");

		
		//Function para mostrar los resultados
		function flightList(myObject) {
			
			myObject.forEach(function(obj){

				var showFlight = "El vuelo con origen: " + obj.from;
				showFlight += ", y destino: " + obj.to;
				showFlight += " tiene un coste de " + obj.cost + "€";
				
				//Hacemos comprobación para concatenar si tienen escala o no
				if (obj.scale === true) {
					var knowScales = " y realiza escalas"
				} else {
					var knowScales = " y no realiza ninguna escala"
				}

				showFlight += knowScales;

				console.log(showFlight);
			})
		}

		flightList(myObject);

		console.log(separador);
		
		//Function para mostrar el coste medio de todos los vuelos
		function flightProm(myObject) {
			
			var acc = 0;

			myObject.forEach(function(obj){
				var prom = obj.cost;
				acc += prom;
			})

			var totalProm = acc / myObject.length;

			console.log("El coste medio de los vuelos es de: " + totalProm.toFixed() + "€");
		}

		flightProm(myObject);

		console.log(separador);

		//Function para mostrar cuántos vuelos efectúan escalas
		function scaleFlights(myObject) {

			var counter = 0;
			var arrFlights = [];

			myObject.forEach(function(obj){

				if (obj.scale === true) {
					counter++;
					arrFlights.push(obj.from + " - " + obj.to);
				}
			})

			console.log("Hay " + counter + " vuelos que efectúan escalas y son los siguientes: " + arrFlights.join(", "));
		}

		scaleFlights(myObject);

		console.log(separador);

		//VERSIÓN 1
		//Function para mostrar los destinos de los últimos vuelos del dia contando que son los de la mitad hacia abajo.
		function lastFlights(myObject) {

			var emptyArray = [];
			var middle = myObject.length / 2;

			for (var i=middle; i<myObject.length; i++) {
				emptyArray.push(myObject[i]["to"])
			}

			console.log("Los últimos vuelos del día tienen los siguientes destinos: " + emptyArray.join(", "));
		}

		lastFlights(myObject);

		console.log(separador);

		//VERSIÓN 2
		//Function para mostrar los 5 últimos vuelos del dia
		function lastFlightsDay(myObject) {

			var emptyArray = [];
			var lastFiveFlights = myObject.length - 5;

			for (var i=lastFiveFlights; i<myObject.length; i++) {
				emptyArray.push(myObject[i]["to"]);
			}
	
			console.log("Los " + lastFiveFlights + " últimos vuelos del día tienen los siguientes destinos: " + emptyArray.join(", "));
		}

		lastFlightsDay(myObject);
	}	
}

airlinesProg(flights);