/* Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, 
el programa se comportará de la siguiente manera:
Si eres ADMIN, la función debería permitir:
Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
Poder eliminar vuelos mediante el ID.
Si eres USER la función debería permitir:
Buscar por precio ( más alto, más bajo o igual), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, 
el programa responderá: "Gracias por su compra, vuelva pronto."*/

function skylabAirline(){
// Declaración de variables
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
{id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false},
];
var user;
var costAv=0;
var numScales=0;

// Función para pedir y recoger el nombre de usuario
function userFunct (){
 user = prompt ("Introduce el nombre de usuario");
 console.log ("Bienvenido/a a Skylab Airlines, "+user);
}
userFunct ();

// Función para mostrar todos los vuelos disponibles
function showFlights (){
	flights.forEach(function(obj){
	if (obj.scale===false){
		console.log ("El vuelo "+obj.id+" con destino "+obj.to+" proveniente de "+obj.from+" tiene un coste de "+obj.cost+" euros y no realiza ninguna escala.");
	}else{
		console.log ("El vuelo "+obj.id+" destino "+obj.to+" proveniente de "+obj.from+" tiene un coste de "+obj.cost+" euros y realiza una o varias escalas");
		numScales+=1;
	}
	costAv= costAv+obj.cost;
	});
}
showFlights();

// Función para mostrar el coste medio de todos los vuelos
function costAverage(){
	console.log ("El coste medio de todos los vuelos disponibles es "+(costAv/flights.length).toFixed(2)+ " euros");
}
costAverage();

// Función para mostrar todos los vuelos que efctuan escalas
function scales(){
	console.log ("En este momento hay "+numScales+" vuelos que efectuan escalas");
}
scales();

// Función para mostrar los últimos 5 vuelos
function lastFiveFlights(){
	console.log ("Los últimos cinco vuelos son:");
	for(var i=flights.length-5; i<flights.length;i++){
		console.log("El vuelo "+flights[i].id+" con destino "+flights[i].to+" proveniente de "+flights[i].from+" tiene un coste de "+flights[i].cost+" euros");
	};
}
lastFiveFlights();

// Función para preguntar y validar si eres USER O ADMIN
var whoAreYou;
function userOrAdmin(){
	do {
		whoAreYou=prompt (user+", ¿nos puedes decir si eres USER o ADMIN?");
	} while (whoAreYou!=="USER"&&whoAreYou!=="ADMIN");
}
userOrAdmin();

if (whoAreYou==="USER"){
	console.log ("Eres un simple usuario, así que solo puedes listar vuelos indicando su precio");
	var cost = prompt("Indicanos el precio que te gustaría pagar, "+user);

} else if (whoAreYou==="ADMIN"){
	do{
	var adminAction = prompt ("Eres el gran administrador de Skylab Airlines, "+user+". Puedes CREAR nuevos vuelos hasta un límite de 15, ELIMINAR vuelos indicando su identificador de vuelo o SALIR ¿Qué quieres hacer?");
		if (adminAction==="CREAR"){
			console.log ("Ha elegido CREAR un nuevo vuelo");
		}else if (adminAction==="ELIMINAR"){
			console.log("Ha elegido ELIMINAR un vuelo");
			var identificador=prompt ("Por favor, "+user+". Indica el id del vuelo que quiere eliminar");
			console.log("Quiere eliminar el vuelo XXX");
		}
	} while (adminAction!=="SALIR");

}
}

skylabAirline();




