function bingo(){

function askName() {
    var person = prompt("Introduzca su nombre", "nombre");
    if (person != null) {
    	console.log("Bienvenid@ " + person + "!");
    } else {
    	console.log("Debes rellenar el nombre para continuar.");
    }
}
askName();

function numRandom() {
    return Math.floor(Math.random() * 10 );
}

var fila = [2,5,8,9,4]
console.log("Los siguientes son tus números " + fila);

function newTurn() {
        var newRandom = numRandom();
        for (var i = 0; i < fila.length; i++) {
            if (newRandom === fila[i]) {
                console.log("Salió el número " + newRandom + "! Que bien!");
                fila[i] = "X";  
            }
        }
        console.log(fila); 
        askTurn();
    }

function askTurn() {
        if (fila[0] === "X" && fila[1] === "X" && fila[2] === "X" && fila[3] === "X" && fila[4] === "X") {
            console.log("Bingooooo! Felicidades! Se acabo el juego!");
            return 0;
        }
        var ask = confirm('Quieres una bola nueva?');
        if (ask) {
            newTurn();
        } else {
            console.log("Que pena que nos abandones... Vuelve cuando quieras!");
            return 0;
        }
    }
    askTurn();
}

bingo();
