	//Array de objetos (Vuelos)
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

	function SkylabAirlines(Name){
		//Wellcome Message
		console.log("Welcome "+Name+"!!!");

		//Showing Flights
		ShowFlights();
		//Showing the average price
		AveragePrice();

		//Showing flights with scale
		ShowScaleFlights();

		//Showing the last 5 flights
		LastFlights();
	}
	




	function ShowFlights(){
		for(i in flights){
			var ScaleNeed ="";
			if(flights[i].scale ==false){
				ScaleNeed ="it's not necessary to make a scale";
			}else{
				ScaleNeed ="it's necessary to make a scale";
			}
			console.log("The flight with origin from "+flights[i].from+" to "+flights[i].to+" has a cost of "+flights[i].cost+" and "+ScaleNeed);
		}
	}

	function markAverage(){
			
			var Sum = 0;
			
			for (i in flights){
				Sum = Sum + flights[i].cost;			
			}
			//Hacemos la media
			var Average = Sum / flights.length;
			return Average;
		}

	function ShowScaleFlights(){
		var ScaleFlights =[];
		for(i in flights){
			if(flights[i].scale ==true){
				ScaleFlights.push("the flight from: "+flights[i].from+" to: "+flights[i].to);
			}
		}
		if(ScaleFlights.length>0){
			console.log("There are "+ScaleFlights.length+" flights with scale, they are "+ScaleFlights.join(","));
		}else{
			console.log("There is no flight with scale");
		}
		
	}

	function AveragePrice(){
		console.log("The average price of all flights is = "+markAverage().toString()+"€");
	}

	function LastFlights(){
		console.log("Lasts flights are: ");
		for(var i=Math.max(flights.length - 5, 1);i<flights.length;i++){
			console.log("From: "+flights[i].from+" To: "+flights[i].to);
		}
	}
	SkylabAirlines("Javier");

