//Preguntas
var questions = [
    { id: 1, letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { id: 2, letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { id: 3, letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") },
    /*{ id: 4, letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { id: 5, letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { id: 6, letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { id: 7, letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { id: 8, letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { id: 9, letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { id: 10, letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { id: 11, letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { id: 12, letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { id: 13, letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { id: 14, letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { id: 15, letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { id: 16, letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { id: 17, letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { id: 18, letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { id: 19, letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { id: 20, letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { id: 21, letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { id: 22, letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { id: 23, letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { id: 24, letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { id: 25, letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { id: 26, letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { id: 27, letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
*/]

//Funcion padre
function pasapalabra(){
    //Declaramos las variables de fallos y aciertos
    var incorrectAnswers=0;
    var correctAnswers=0;


    //Preguntamos Nombre
    function askName(){
        var namePlayer = prompt("Cual es tu nombre?");
        if(namePlayer){
            return namePlayer;
        }else{
            return askName();
        }
    }

    function askTurn(){
        var initiate = confirm("Si quieres empezar pulsa aceptar, sino pulsa cancelar");
        //Si el jugador quiere iniciar el juego
        if(initiate == true){
            //Mostramos las instrucciones
            alert("Instrucciones: Irán apareciendo las descripciones de las palabras que empiecen por la letra en la que estés. Si te encayas en una letra, puedes guardarla para mas tarde escribiendo pasapalabra.");
            initiation();
        }else{
            //Si no quiere iniciarlo
            console.log("Juego finalizado");
        }

    }

    //Funcion para iniciar las preguntas
    function initiation(){
            //Recorremos el array de objetos
                for(var i in questions) {                                 
                    if(questions[i].status==0){
                        //Mostramos la pregunta con el prompt
                        var answering = prompt(questions[i].question);

                        //Comprobamos si la respuesta es correcta
                        if(answering==questions[i].answer){
                            console.log("La respuesta que has dado para la letra "+questions[i].letter+" es correcta.");

                            //Le sumamos un acierto
                            correctAnswers++;

                            //Cambiamos el status a 1 para decir que ya lo ha contestado
                            questions[i].status = 1
                            
                        }else if(answering=="pasapalabra"){
                            console.log("Has hecho pasapalabra de la letra "+questions[i].letter);
                        }else {
                            //Si esta mal la respuesta
                            console.log("La respuesta que has dado para la letra "+questions[i].letter+" es incorrecta.");

                            //Le sumamos un fallo
                            incorrectAnswers++;

                            //Cambiamos el status a 1 para decir que ya lo ha contestado
                             questions[i].status = 1
                        }
                    }                
                }
    }

    function checkPasapalabras(){
        for(var i = 0;i<questions.length;i++){
            while(questions[i].status==0){
                initiation();
            }
        }
    }

    //Iniciamos el preguntar turno
    askTurn();

    //Repasamos si hemos hecho algun pasapalabra
    checkPasapalabras();

    //mostramos los fallos y aciertos
    console.log(incorrectAnswers+" "+correctAnswers);
    }

pasapalabra();
