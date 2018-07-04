function bingo() {

    //creamos la funcion con nombre askName y no le pasamos parametro, ya que lo debera pasar el usuario

    function userName() {
        var person = prompt("Introduzca su nombre");
        if (person) {
            return person;
        } else {
            (person != typeof (string));
            return userName();
        }
    }

    //Creamos una funcion para generar un numero del 1 al 15 (ponemos +1 para excluir el 0)

    function randomNumber() {
        return (Math.floor((Math.random() * 15) + 1));
    }

    //Creamos otra funcion para que nos cree un carton con una linea de numeros


    function crearLinea() {
        var linea = [];
        for (var i = 0; i < 5; i++) {
            var random = randomNumber();
            var genRandom = linea.indexOf(random);
            if (genRandom === -1) {
                linea.push(random);
            } else {
                return crearLinea();
            }
        }
        return linea;
    }
    crearLinea();


    //Creamos una funcion que genera un numero aleatorio (como una bola del Bingo) y el numero generado lo añadimos a un array
    //Array vacio fuera de la funcion, si no cada vez que se ejecutara el for el array siempre estaria vacio ya que lo reiniciaria

    function randomNumBall() {
        for (var i = 0; i < 15; i++) {
            var random = randomNumber();
            var genRandom = repeatNumber.indexOf(random);
            if (genRandom === -1) {
                repeatNumber.push(random);
                return random;
            }
        }

    }

    var repeatNumber = [];


    //creamos una nueva funcion con un confirm, que saca numeros random y si le das a cancelar se acaba el juego.

  
    function newTurn() {
        var opcion = confirm('Si quieres otro numero haz click en Aceptar, si quieres acabar el juego haz click en Cancelar');
        if (opcion === true) {
            return turn();
        } else {
            console.log('Has perdido');
        }
    }


    //Creamos una funcion que debera comprobar si los numeros estan en el carton

    function turn() {
        var newNumber = randomNumBall();
        console.log("El siguiente numero es... " + newNumber);
        var genRandom = carton.indexOf(newNumber);

        for (var i = 0; i < carton.length; i++) {
            if (genRandom > -1) {
                carton[genRandom] = "X";
                console.log(carton.join(' - '));
                return newTurn();
            } else {
                return newTurn();
            }
        }
    }

    var person = userName();
    console.log("Hola " + person + " Bienvenido a SkylaBingo");
    var carton = crearLinea();
    console.log(person + ", aqui tienes tu carton");
    console.log(carton.join(' - '));

    turn();

}

bingo();


/*

function bingo(){

//creamos la funcion con nombre askName y no le pasamos parametro, ya que lo debera pasar el usuario

function userName (){ 
    var person = prompt("Introduzca su nombre"); 
        if (person) { 
            return person;
        }
}
    
//Creamos una funcion para generar un numero del 1 al 15 (ponemos +1 para excluir el 0)
     
    function randomNumber(){
        return (Math.floor((Math.random()* 15) +1));
        }


    function crearCarton(){

        var carton = []
        var repeatNumbers = []

var y = 12;

        for (var i=0;i<=4;i++) {

            for (var x=0;x<carton.length;x++){
                if(carton.indexOf(y) === 0) {
                    console.log("te subo el 12")
                }
            }


        carton.push(randomNumber())





        }
        return carton
    }    


var person = userName();
    console.log ("Hola " + person + " Bienvenido a SkylaBingo");
var carton = crearCarton()
    console.log(person + ", aqui tienes tu carton")
    console.log(carton)
    
    
}

*/