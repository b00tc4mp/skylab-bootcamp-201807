//Skylab Airlines! ✈️🛩
//(Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

//Programa una inferfaz de usuario para una aerolinea (por terminal...). 
//Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, 
//estos vuelos estarán declarados de manera global, cuando se llame a la función:

//Se preguntará por el nombre de usuario y dará la bienvenida.
//El usuario visualizará todos los vuelos disponibles de una forma amigable:
// El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
//A continuación, el usuario verá el coste medio de los vuelos.
//También podrá ver cuantos vuelos efectúan escalas.
//Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

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


function padre(){

	function askName(){
		var name = prompt("Muy buenas internauta, ¿Como te llamas?")

		if(name != null){
			var date = new Date(); 
			var dayTime = date.toLocaleTimeString().substr(0,5); // toLocaleTimeString() = 14:56:14 
			if(dayTime < "12:00"){
				alert("Buenos dias " + name)
			}else if((dayTime >= "12:00") || (dayTime < "20:00")) {
				alert("Buenas tardes " + name)
			}else if((dayTime >= "20:00") || (dayTime <= "06:00")){
				alert("Buenas noches " + name)
			}
		} else {
			prompt("¿Nombre?")
		}
	} 
	askName()
//El usuario visualizará todos los vuelos disponibles de una forma amigable:
// El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
	function vuelos(){

	
		flights.forEach(function(obj){
			var escala = ''
			if(obj.scale === false){
				escala = "Vuelo sin escalas"
			} else {
				escala = "Vuelo con escala"
			}
			console.log("El vuelo con origen: " + obj.from + ", y destino: " + obj.to + " tiene un coste de " + obj.cost + "€." + escala)
		})
	}
	vuelos()

//A continuación, el usuario verá el coste medio de los vuelos.
	function costeMedio(){
		var arr = []
		var acc = 0
		flights.forEach(function(obj){
			acc += obj.cost
			arr.push(obj.cost)
		})
		console.log("El coste medio de los vuelos es de " + acc/arr.length + "€.")
	}
	costeMedio()


//También podrá ver cuantos vuelos efectúan escalas.

	function vuelosEscalas(){
		var arr = []
		flights.forEach(function(obj){
			if(obj.scale === true){
				arr.push(obj.scale)
			} 
		})
		console.log("Hacen escala " + arr.length + " vuelos.")

	}
	vuelosEscalas()

//Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
	function cincoVuelos(){
		for(prop in flights){
			if(flights[prop].id >= 5){
				console.log("ULTIMA HORA: Vuelo con destino a " + flights[prop].to + ".")
			}
		}

	}
	cincoVuelos()


} //cierra funcion padre
padre()

////////////////////CAMPO DE TIRO
