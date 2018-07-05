function main() {
	clear();
	// vuelos
	var flights = [
		{id: 02, to: "Paris", 		from: "Barcelona", 	cost: 210,	scale: false},
		{id: 00, to: "New York", 	from: "Barcelona", 	cost: 700,	scale: false},
		{id: 01, to: "Los Angeles", from: "Madrid", 	cost: 1100,	scale: true},
		{id: 03, to: "Roma", 		from: "Barcelona", 	cost: 150,	scale: false},
		{id: 04, to: "London", 		from: "Madrid", 	cost: 200,	scale: false},
		{id: 05, to: "Madrid", 		from: "Barcelona", 	cost: 90,	scale: false},
		{id: 06, to: "Tokyo", 		from: "Madrid", 	cost: 1500,	scale: true},
		{id: 07, to: "Shangai", 	from: "Barcelona", 	cost: 800,	scale: true},
		{id: 08, to: "Sydney", 		from: "Barcelona", 	cost: 150,	scale: true},
		{id: 09, to: "Tel-Aviv", 	from: "Madrid", 	cost: 150,	scale: false}
	]
	// Se preguntará por el nombre de usuario y dará la bienvenida.
	var name = login();
	console.log("Bienvenido/a "+ name+".");
	// El usuario visualizará todos los vuelos disponibles de una forma amigable: 
	// El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
	logFlights(flights);
	// A continuación, el usuario verá el coste medio de los vuelos.
	var meanCost = computeMeanCost(flights);
	console.log("Coste medio: "+meanCost+" €.")
	// También podrá ver cuantos vuelos ef	ectúan escalas.
	logFlightsWithScale(flights);
	// Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, 
	// muestra al usuario sus destinos.
	logLast5Flights(flights);
	// PRO
	var user = userLogin()
	if(user == "ADMIN") {
		adminActions(flights);
	} else if (user == "USER") {
		userActions(flights);
	} else {
		console.log("User not valid ! Bye.")
	}

	// funciones auxiliares
	function adminActions(flights) {
		clear();
		console.log("Bienvenido al panel de administrados.");
		while(true) {
			var modo = prompt("Panel administrador:\nModo: 0 (eleminar vuelo), 1 (añadir vuelo), otro para salir");
			if (modo != "0" && modo != "1")
				break;
			if(modo == "0") {
				deleteFlight(flights);
			}
			else if(modo == "1") {
				addFlight(flights);
				logFlights(flights);
			}
		}
	}

	function deleteFlight(flights) {
		var id = prompt("Id del vuelo a eliminar");
		var deleteId;
		for(var i=0; i<flights.length; i++) {
			if(flights[i].id == id)
				deleteId = i;
		}	
		flights.splice(deleteId,1);
	}

	function addFlight(flights) {
		if(flights.length >= 15) {
			alert("No se pueden añadir más vuelos.")
		} else {
			var flight = {id: -1, to: "to", from: "from", cost: -1, scale: false};
			var id = prompt("Id: ");
			// comprobar que es numero y no está ya presente
			var newId = true;
			for(var i=0; i<flights.length; i++) {
				if(flights[i].id == id) {
					alert("Este id ya existe !");
					newId = false;
					break;
				}

			}	
			if(newId) {
				flight.id = id;
				flight.to = prompt("To: ");
				flight.from = prompt("From: ");
				flight.cost = prompt("Cost: ");
				flight.scale = prompt("Scale (true/false): ");
				flights.push(flight);
			}
		}		

	}
	function userActions(flights) {
		clear();
		console.log("Bienvenido al buscador.");
		while(true) {
			var modo = prompt("Buscador de precios:\nModo: 0 (mayor), 1 (menor o igual), otro para salir");
			if (modo != "0" && modo != "1")
				break;
			var precio = prompt("Buscador de precios:\nPrecio: ");
			if(modo == "0")
				logFlightsBiggerCost(flights,precio);
			else if(modo == "1") 
				logFlightsSmallerCost(flights,precio);
		}
		console.log("Gracias por su compra, vuelva pronto.");
	}

	function logFlightsBiggerCost(flights,precio) {
		console.log("Vuelos con precio mayor que "+precio+".")
		flights.forEach(function(flight) {
			if(flight.cost > precio) {
				console.log("Vuelo "+flight.id+" con orígen "+flight.from+" y destino "+flight.to+" tiene un coste de "+flight.cost+" €.");
			} 
		});
	}

	function logFlightsSmallerCost(flights,precio) {
		console.log("Vuelos con precio menor que "+precio+".")
		flights.forEach(function(flight) {
			if(flight.cost <= precio) {
				console.log("Vuelo "+flight.id+" con orígen "+flight.from+" y destino "+flight.to+" tiene un coste de "+flight.cost+" €.");
			} 
		});
	}

	function login() {
		var name = prompt("Name");
		return name;
	}

	function logFlights(flights) {
		console.log("Estos son los vuelos disponibles para ti:")
		flights.forEach(function(flight) {
			var escala = "";
			if(flight.scale) {
				escala = "y realiza escala.";
			} else {
				escala = "y no realiza ninguna escala.";
			}
			console.log("Vuelo "+flight.id+" con orígen "+flight.from+" y destino "+flight.to+" tiene un coste de "+flight.cost+" € "+escala);
		});
	}

	function computeMeanCost(flights) {
		var acc = 0;
		var size = 0;
		flights.forEach(function(flight){
			acc += flight.cost;
			size++;
		});
		return acc/size;
	}

	function logFlightsWithScale(flights) {
		console.log("Estos son los vuelos con escala:")
		flights.forEach(function(flight) {
			if(flight.scale) {
				console.log("Vuelo "+flight.id+" con orígen "+flight.from+" y destino "+flight.to+" tiene un coste de "+flight.cost+" €.");
			} 
		});
	}

	function logLast5Flights(flights) {
		var last5flights = flights.slice(-5);
		console.log("Estos son los destinos de los últimos 5 vuelos:")
		last5flights.forEach(function(flight) {
			console.log("Vuelo "+flight.id+" con destino "+flight.to+".");
		});
	}

	function userLogin() {
		var user = prompt("User login (ADMIN/USER)");
		return user;
	}

}
