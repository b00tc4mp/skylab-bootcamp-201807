//SKYLAB AIRLINES
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

function airlines(){
	function terminal(){
		var name = prompt("¿Hola, cúal es tu nombre?");
		console.log("Bienvenido, " + name + " , a continuación te muestro los vuelos disponibles");

		console.log("------------------------------");
		console.log("TODOS LOS VUELOS DISPONIBLES");
		var acc = 0;
		flights.forEach(function(obj){

			acc+=obj.cost;
			if(obj.scale === false){
				console.log("El vuelo con origen: " + obj.from + " ,con destino " +
					obj.to + " tiene un coste de: " + obj.cost + " euros, sin escalas");
			}else{
				console.log("El vuelo con origen: " + obj.from + " ,con destino " +
					obj.to + " tiene un coste de: " + obj.cost + " euros, con escalas");
			}

		});
		console.log("El coste medio de los vuelos " + acc/Object.keys(flights).length + " euros.");
		console.log("------------------------------");
		console.log("VUELOS SÓLO CON ESCALAS");

		flights.forEach(function(obj){
			if(obj.scale === true){

				console.log("El vuelo con origen: " + obj.from + " ,con destino: " + 
					obj.to + " tiene un coste de: " + obj.cost + " euros.");
			}

		});
		console.log("------------------------------");
		console.log("LOS ÚLTIMOS 5 VUELOS DEL DÍA SÓN:");

		var theLasts = (Object.keys(flights).length-1) - 5;

		flights.forEach(function(obj){

			if(obj.id > theLasts){
				console.log("El vuelo con origen: " + obj.to + " tiene de destino: " + obj.from);
			}
		});

		//USER O ADMIN
		var userAdmin = " " ;
		while(userAdmin !== "user" && userAdmin !== "admin"){

			userAdmin = prompt("¿Eres administrador o usuario? (user/admin)");
			if(userAdmin === "admin"){
				admin();
			}else if (userAdmin === "user"){
				user();
			}
		}
	}

	function admin(){
		var questionAdmin =  " ";
		while(questionAdmin !== "insertar" && questionAdmin !== "borrar" && questionAdmin !== "salir"){

			questionAdmin = prompt("¿Quieres insertar, borrar vuelos o salir?");
			if(questionAdmin === "insertar"){
				addFlight();
			}else if(questionAdmin === "borrar"){
				deleteFlight();
			}else if(questionAdmin === "salir"){
				console.log("Que tenga un buen día");
			}
		}
	}

	function addFlight(){
		var id = prompt("¿Qué id le quieres poner al vuelo?");
		id = parseInt(id);
		var to = prompt("¿A donde irá el vuelo?");
		var from = prompt("¿Desde donde saldrá?");
		var cost = prompt("Coste del vuelo");
		cost = parseInt(cost);
		var scale = prompt("Tendrá escalas (true/false)");

		if(Object.keys(flights).length > 15){
			alert("Se ha superado el limite de vuelos en el sistema, prueba en otro momento");
		}else{
			flights.push({id:id,to:to,from:from,cost:cost,scale:scale});
			console.log("------------------------------");
			console.log("MOSTRANDO LISTA DE VUELOS ACTUALIZADA");
			flights.forEach(function(obj){
				console.log("Indentificador: " + obj.id + " con vuelo a: " + obj.to + " desde: " + obj.from);
			});
		}
		admin();
	}

	function deleteFlight(){
		var idFlight = prompt("Anota el id del vuelo que quieres borrar");
		idFlight = parseInt(idFlight);
		var idF;
		flights.forEach(function(obj){

			if(idFlight === obj.id){
				idf = idFlight;
				delete flights[idf];
			}
		});
		console.log("------------------------------");
		console.log("El vuelo ha sido borrado, muestro la lista actualizada");
		flights.forEach(function(obj){
			console.log("Indentificado: " + obj.id + " con vuelo a: " + obj.to + " desde: " + obj.from);
		});
		admin();
	}

	function user(){
		//Imagino que habrá una manera más limpia de sacar los máximos y mínimos.....
		var user = "";
		while(user !== "caro" && user !== "barato" && user !== "igual"){
			var user = prompt("¿Que vuelos quieres ver?(caro,barato,igual)");
		} 

		if(user === "caro"){	
			var max = Number.MIN_VALUE;
			flights.forEach(function(obj){
				if(obj.cost > max){
					max = obj.cost;
					flightMax = obj.id;
				}
			});
			console.log("El vuelo con el precio más alto es: " + max + " con el id: " + flightMax);
			console.log("Gracias por su compra, vuelva pronto.");

		}

		else if(user === "barato"){
			var min = Number.MAX_VALUE;
			flights.forEach(function(obj){
			if(obj.cost < min){
				min = obj.cost;
				flightMin = obj.id;
			}
		});
			console.log("El vuelo con el precio más barato es: " + min + " con el id: " + flightMin);
			console.log("Gracias por su compra, vuelva pronto.");
		}

		else if(user === "igual"){
			var max = 0;
			var element = new Array();
	     
		for(var i = 0; i<flights.length;i++){
			var count = 1;
			for(var k = 0; k<flights.length;k++){
				if(flights[i].cost === flights[k].cost){
					count++;
				}
				if(count > max){
					rep = flights[i].cost;
					max = count;
				}
			}
		}
			flights.forEach(function(obj){
				if(obj.cost === rep){
					element.push(obj.id);
				}
			});
		
			console.log("El precio más repetido es => " + rep + " .Con los id => " + element);
			console.log("Gracias por su compra, vuelva pronto.");
		}

		}

	return terminal();

}
airlines();






