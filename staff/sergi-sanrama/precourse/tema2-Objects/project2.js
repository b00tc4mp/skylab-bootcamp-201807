function skyLabAirlanes(flights){
	airlinesHelloUser();
	showAllFlights(flights);
	scaleAll(flights);
	lastFive(flights);
	avCost(flights);
};

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

//Source: https://www.w3schools.com/jsref/met_win_prompt.asp
var person = "";
function airlinesHelloUser(){

	var user = prompt("Hi Dear, welcome to SkyLab Airlanes, can you tell us your name?");
	if (user != null) {
    	console.log ("Welcome Back " + user + ", a pleasure to see you again!");
    	person = user;
	}
}

function showAllFlights(allFlights){
	console.log(person + ", here have the flights: ")

	allFlights.forEach(function(object){
		if(object.scale === false){
			console.log("The flight with origen: " + object.from + " , and destination: " + object.to + " it has a cost " + object.cost + " and it does not stop.")
		}else{
			console.log("The flight with origen: " + object.from + " , and destination: " + object.to + " it has a cost " + object.cost + " and it does stop.")
		}
	});
}

function scaleAll(object) {
	var scales = 0;
	var arrFlights = [];
	object.forEach(function(ob){	
		if (ob.scale === true) {
			scales++;
			arrFlights.push(ob.from + " to " + ob.to);
		}
	})
	console.log(scales + " flights that make stops: " + arrFlights.join("/ "));
};

function lastFive(halfFlights){
	var result = halfFlights.slice(Math.max(halfFlights.length / 2, 0));
	console.log("The last " + result.length + " flights are ... ");

	result.forEach(function(object){
		console.log("The flight with departure " + object.from + " with arrival " + object.to);
	})
};

function avCost(aveCost){
	var sumaCost = 0
	aveCost.forEach(function(cost){
		sumaCost += cost.cost;
	});
	console.log(person + ", the average cost of all this flights are: " + sumaCost / aveCost.length + " $");
}

skyLabAirlanes(flights);



