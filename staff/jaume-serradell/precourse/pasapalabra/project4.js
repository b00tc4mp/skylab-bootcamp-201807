var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") }
]

function pasapalabra(myObject) {
    var acertados = 0;
    var fallados = 0;

    function pregunta() {

        myObject.filter(function(obj){ return obj.status === 0 }).forEach(function(obj){

            var userAnswer = prompt(obj.question).toLowerCase();
            //status 1 = contestado, nos da igual si acertado o fallado
            if (obj.answer === userAnswer) {
                alert("Has acertado!!");
                obj.status = 1;
                acertados++;
            } else if (userAnswer === "pasapalabra"){
                //dejamos el status 0 = no contestado
                confirm('pasamos palabra')
            } else if (obj.answer != userAnswer) {
                alert("Has fallado!!");
                obj.status = 1;
                fallados++;
            }  else {
                console.log("Has salido")
            }
        })
    // comproba,os al final del bucle si tenemos que seguir jugando
    askRosco()
    }

    function askRosco(){
        //hay 0 en el array de objetos?, el filter devuelve otro array
        var exist0 = myObject.filter(function(obj){
            return obj.status === 0
        })
        // si la longitud del array con status 0 es mayor que 0 (hay alguna pregunta con 0), volvemos al rosco
        // si no, salimos
        if(exist0.length > 0) { return pregunta() }
        else{ return 0 }
    }

    pregunta();

    console.log("Aciertos: " + acertados);
    console.log("Fallos: " + fallados)
}

pasapalabra(questions);