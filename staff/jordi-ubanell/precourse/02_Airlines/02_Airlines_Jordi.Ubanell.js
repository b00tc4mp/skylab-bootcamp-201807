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
	];

function welcome(myName) {
	    var name = myName;
	    console.log("Hi " + name + ", you are welcome");
	}

	function listFlights(startIndex) {
	    for (var i = startIndex; i < flights.length; i++) {
	        var flightObject = flights[i];
	        if (flightObject.scale == true) {
	            var scale = ", con escala";
	        } else {
	            var scale = ", sin escala";
	        }
	        var flightStr = "From " + flightObject.from + " to " + flightObject.to + " -> costs: " + flightObject.cost + scale;
	        console.log(flightStr);
	    }
	}

	function mediumCost() {
	    var totalCost = 0;
	    for (var i = 0; i < flights.length; i++) {
	        var flightObject = flights[i];
	        totalCost += flightObject.cost;
	    }
	    var mediumCost = totalCost / flights.length;
	    console.log("The medium cost is: " + mediumCost);
	}

	function withScale() {
	    var scales = 0;
	    for (var i = 0; i < flights.length; i++) {
	        var flightObject = flights[i];
	        if (flightObject.scale == true) {
	            scales++;
	        }

	    }
	    console.log("The number of flights with scale is : " + scales);
	}

	welcome("Jordi Ubanell");
	listFlights(0);
	mediumCost();
	withScale();
	var startIndex = flights.length - 5;
	if (startIndex < 0) {
	    startIndex = 0;
	}
	listFlights(startIndex);