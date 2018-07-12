function bingo(){

function userName(){ 
  var person = prompt("Can you tell us your name?"); 
    if (person) { 
      return person;
    } else { (person != typeof(string)) 
      return userName();
    } 
}
    
function randomNumber(){
    return (Math.floor((Math.random()* 15) +1));
}

function createLine(){
    var line = [];
        for (var i=0;i<5;i++) {
            var random = randomNumber()
            var genRandom = line.indexOf(random);
                if (genRandom === -1) {
                    line.push(random);
                } else {
                    return createLine();
                }
        }  
        return line;
}
createLine();


function randomNumBall(){   
    for (var i=0;i<15;i++) {
    var random = randomNumber()
    var genRandom = repeatNumber.indexOf(random);
        if (genRandom === -1) {
            repeatNumber.push(random);
        return random
        }
    }
}  
  
var repeatNumber = []

function newTurn(){
	var opcion = confirm("Next number push click Accept, if u want go out click Cancel")
	    if(opcion === true) {     
	        return turn();
	    } else {
	        console.log(" U lose ")
    }
}

function turn() {
	var newNumber = randomNumBall();
	    console.log("Next number is: " + newNumber);
	var genRandom = carton.indexOf(newNumber);

    for (var i=0;i<carton.length;i++){
        if (genRandom > -1) {
            carton[genRandom] = "X"
                console.log(carton.join(' - '))
                return newTurn()
        	} else {
                return newTurn()
        }
    }
}

function start (){
	var person = userName();
	  console.log ("Hi " + person + ", welcome to the Bingo");
	var carton = createLine();
	  console.log(person + ", here have ur cartoon")
	  console.log(carton.join(' - '))
}
start();
turn();

}

bingo();