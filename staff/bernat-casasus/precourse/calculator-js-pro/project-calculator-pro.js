function decimsControl(num){
	//To round 3 decimals 1000 , to round 4 10000 (variate the number of deimals).
	return Math.round(num * 1000) / 1000;
	/*  ** WE CAN ALSO DO IT LIKE THESE - FIXING THE DECIMALS **

			if(num % 1 != 0){
				return num = num.toFixed(3);
			}else{
				return num;
			}
	*/
}

function squareRoot(num){
		num = Math.sqrt(num);
		return decimsControl(num);
}

function sumNumbers(array){
			var sum = 0;
			for (var i = 0; i < array.length; i++){
					sum += array[i]   
			}
			return sum;
}

function restNumbers(array){
			var rest = 0;
			for (var i = 0; i < array.length; i++){
					rest -= array[i]   
				}
			return rest;
}

function multiNumbers(array){
			var multi = 1;
			for (var i = 0; i < array.length; i++){
					multi *= array[i]   
			}
			return multi;
}

function diviNumbers(array){
			var divi = array[0];
			var count = 0;
				for (var i = 0; i< array.length-1;i++){
				 		count++;
					    divi /= array[count]   
				    }
				    return divi;
}

function startCalculator(){
		var answer = prompt("New numbers? y/n");

	//CHECK IF THE VALUE IS NULL
	    if (answer === null) {
	    	console.log("Bye!");
        	return; //break out of the function early
    	}
		if(answer === "y" || answer === "n"){

			switch(answer){
				case "y":
					var numbers = prompt("Introduce the numbers separated by commas. Eg: 2,3,5 :");
					var arrayNumbers = numbers.split(",");

					var numCheck = false;
				//CHEK IF IS NOT A NaN
					for(var i = 0; i<arrayNumbers.length;i++){

							if(isNaN(arrayNumbers[i])){
							numCheck = true;

							}
					}
				//IF IS NOT A NaN
					if(numCheck === false){

						var arrayOperators = [];

							for(var i = 0; i<arrayNumbers.length;i++){

								arrayOperators.push(Number(arrayNumbers[i]));
							}

							console.log("You have introduced the numbers: "+arrayOperators+" to operate with them.");
							calculate(arrayOperators);
					}else{
				//IF IS A NaN
						console.log("You have to enter numeric operators! Try again!");
						startCalculator();
					}
					break;

				case "n":
					console.log("Bye!");
					break;
			}
		}else{
			console.log("You must write 'y' or 'n'. Try again!");
			startCalculator();
		}
}

var result = "";
var resultNumbers = 0;

function calculate(arrayNum){
//ARRAY CHECK.
	if(arrayNum instanceof Array){
//IF ARRAY
		if(arrayNum.length === 1){
			//Square Root
			resultNumbers +=1;
			result = result+("\n"+resultNumbers+". Operation The Square Root of "+arrayNum[0]+" is "+squareRoot(arrayNum[0]));
			console.log(result);

			startCalculator();

		}else if(arrayNum.length >= 2){

			//SUM REST MULTI DIVI
				//SUM
			    var sum = sumNumbers(arrayNum);

				//REST
			    var rest = restNumbers(arrayNum);

				//MULTI
			    var multi = multiNumbers(arrayNum);

				//DIVI
			    var divi = diviNumbers(arrayNum);

			resultNumbers +=1;
			result = result+("\n"+resultNumbers+". Operation SUM: "+decimsControl(sum)+" REST: "+decimsControl(rest)+" MULTI: "+decimsControl(multi)+" DIVI: "+decimsControl(divi));
			console.log(result);

			startCalculator();
		}
	}
}

startCalculator();