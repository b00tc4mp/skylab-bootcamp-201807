function bingo(){
//Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse.
function askName() {
    var person = prompt ("Introduzca su nombre", "nombre");
    if (person != null) {
    	console.log("Bienvenid@ " + person + "!");
    } else {
    	console.log("Debes rellenar el nombre para continuar.");
    }
}

//-Function! => Generar Numero Random 
function numRandom() {
	return Math.floor(Math.random() * 10 );
}

//Genero 5 filas de 5 numeros hasta el 50 y que no se repitan
var numbers = [1,2,3,4,5,6,7,8,9,10];
var carton = [2,5,8,9,4];
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = numRandom();
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
var randomNumsShuffle = shuffle(numbers)
for(var i = 0; i < numbers.length; i=i+5){
	carton.push([numbers[i], numbers[i+1], numbers[i+2], numbers[i+3], numbers[i+4]])
}
carton;

//si tiene el número, que se marque una X y si no lo tiene que le salga newTurn
function newTurn() {
        var newRandom = numRandom();
        for (var i = 0; i < numbers.length; i++) {
            if (newRandom === numbers[i]) {
                console.log("Salió el número " + newRandom);
                numbers[i] = "X";  
            }
        }
        console.log(randomNumsShuffle); //me convierte en X pero no se pone en formato carton, aparecen todos los números. 
        //En cambio si hago "console.log(carton);" me aparece en carton pero no se ponen como X los números :(
        askTurn();
    }

//-Function! => Nuevo turno
function askTurn() {
        if (numbers[i] === "X" && numbers[i+1] === "X" && numbers[i+2] === "X" && numbers[i+3] === "X" && numbers[i+4] === "X") {
            console.log("Se acabo el juego! Felicidades!");
            return 0;
        }
        var ask = confirm('Quieres jugar de nuevo?');
        if (ask === true) {
            newTurn();
        } else {
        	console.log("ByeBye!");
            return 0;
        }
    }
    askTurn();

}

bingo();
