var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") }
]

// VARIABLES GLOBALES //
var i = 0;
var success = 0;
var fail = 0;
var finalResult;
var name = '';
var players = [];
var check = false;

// LISTENERS //
btnCheckName.addEventListener('click', checkName);
validateBtn.addEventListener('click', validateAnswer);
pasapalabraBtn.addEventListener('click', pasapalabra);
endGameBtn.addEventListener('click', byeGame);
playAgainBtn.addEventListener('click', retryGame);

// FUNCIONES//
/*
Función para comprobar si el textbox y el checkbox está rellenado y clicado
y lanzar el juego
*/
function checkName() {
    
    check = document.getElementById('checkConditions').checked;
    name = document.getElementById('textInputName').value;
    document.getElementById('welcome').style.display = 'block';

    if (name !== '' && check === true) {
        document.getElementById('name').innerHTML = name;
        document.getElementById('game').style.display = 'block';
        printQuestions();
    } else if (name !== '' && check === false) {
        document.getElementById('alertCheckbox').style.display = 'block';
        timeOut();
    } else if (name === '' && check === true) {
        document.getElementById('alertName').style.display = 'block';
        timeOut();
    } else {
        document.getElementById('alertName').style.display = 'block';
        document.getElementById('alertCheckbox').style.display = 'block';
        timeOut();
    }
}

//Función para esconder las alertas
function timeOut() {
    setTimeout(function(){ 
        document.getElementById('alertName').style.display = 'none';
        document.getElementById('alertCheckbox').style.display = 'none';
    }, 3000);
}

//Función para mostrar las preguntas
function printQuestions() {
    document.getElementById('counterAciertos').innerHTML = success;
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('user').style.display = 'block';
    //document.getElementById(i).classList.add('animacion');
    
    finalResult = success + fail;

    //Comprobación para finalizar el juego
    if(finalResult === questions.length) {
        return endGame();
    }
    
    if(i === questions.length) {
        i = 0;
    }

    if (questions[i].status === 0) {
        document.getElementById('question').innerHTML = questions[i].question;
    } else if (questions[i].status === 1) {
        i++;
        printQuestions();
    }
}

//Función para validar si la respuesta es correcta o incorrecta
function validateAnswer() {
    if(inputTextGame.value.toLowerCase() === questions[i].answer) {
        document.getElementById(i).classList.add('greenBall');
        document.getElementById('inputTextGame').value = '';
        //document.getElementById(i).classList.remove("animacion");
        questions[i].status = 1;
        success++;
        i++;
        printQuestions();
    } else {
        document.getElementById(i).classList.add('redBall');
        document.getElementById('counterAciertos').value = '';
        //document.getElementById(i).classList.remove("animacion");
        questions[i].status = 1;
        fail++;
        i++;
        printQuestions();
    }
}

//Función para pasar de palabra
function pasapalabra() {
    document.getElementById(i).classList.add('orangeBall');
    //document.getElementById(i).classList.remove("animacion");
    //console.log('status pregunta' + i + ': ' + questions[i].status)
    i++;
    printQuestions();
}

//Función para finalizar el juego y acceder al ranking
function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('ranking').style.display = 'block';
    createPlayer();
}

//Función para crear el jugador
function createPlayer() {

    function player(name, success) {
        this.nombre = name;
        this.aciertos = success;
    }

    players.push(new player(name, success));

    players.sort(function(a,b){
        if (a.aciertos > b.aciertos) {
            return -1;
        }
        if (a.aciertos < b.aciertos) {
            return 1;
        }
        return 0;
    })

    document.getElementById('printPlayer').innerHTML = '';
    players.forEach(function(obj){
        var node = document.createElement("li");
        var textnode = document.createTextNode(obj.nombre + ': ' + obj.aciertos + ' acierto/s');
        node.appendChild(textnode);
        document.getElementById('printPlayer').appendChild(node);   
    })
}

//Función para volver a jugar
function retryGame() {
    document.getElementById('ranking').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('user').style.display = 'none';
    clearVars();
}

//Función para resetear los valores a 0
function clearVars() {
    i = 0;
    success = 0;
    fail = 0;
    name = '';
    
    document.getElementById('name').innerHTML = '';
    document.getElementById('textInputName').value = '';
    document.getElementById('checkConditions').checked = false;

    questions.forEach(function(obj){
        if(obj.status !== 0) {
            obj.status = 0;
        }    
    })

    for(i; i<questions.length; i++) {
        document.getElementById(i).classList.remove('orangeBall');
        document.getElementById(i).classList.remove('greenBall');
        document.getElementById(i).classList.remove('redBall');
    }
    document.getElementById('counterAciertos').innerHTML = '';
}

//Función para terminar el juego
function byeGame() {
    document.getElementById('ranking').style.display = 'none';
    document.getElementById('endGame').style.display = 'block';
    document.getElementById('user').style.display = 'none';
}