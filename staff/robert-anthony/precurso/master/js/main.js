const debug = console.log.bind(console);
const line = console.log.bind(console, "-------------");

const charsNumSpacesRegex = new RegExp(/^[ñÑa-zA-Z\s\-]+$/);

const ENTER_KEY = 13;
const LETTER_NORMAL_CLASS = "letterNormal";
let canPlayFlag = true;


class QuestionGenerator {
    constructor() {
        this.data = [
            {
                letter: "a",
                answer: "abducir",

                status: 0,
                question: [("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"), ("CON LA A. 2 Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"), ("CON LA A. 3Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien")]
            },
            {
                letter: "b",
                answer: "bingo",

                status: 0,
                question: [("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"), ("CON LA B. 2 Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"), ("CON LA B. 3 Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso")]
            },
            {
                letter: "c",
                answer: "churumbel",

                status: 0,
                question: [("CON LA C. Niño, crío, bebé"), ("CON LA C. Niño, crío, bebé"), ("CON LA C. Niño, crío, bebé")]
            },
            {
                letter: "d",
                answer: "diarrea",

                status: 0,
                question: [("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"), ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"), ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida")
                ]
            },
            {
                letter: "e",
                answer: "ectoplasma",

                status: 0,
                question: [("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"), ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"), ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación")]
            },
            {
                letter: "f",
                answer: "facil",

                status: 0,
                question: [("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"), ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"), ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad")]
            },
            {
                letter: "g",
                answer: "galaxia",

                status: 0,
                question: [("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"), ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"), ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas")]
            },
            {
                letter: "h",
                answer: "harakiri",
                status: 0,
                question: [("CON LA H. Suicidio ritual japonés por desentrañamiento"), ("CON LA H. Suicidio ritual japonés por desentrañamiento"), ("CON LA H. Suicidio ritual japonés por desentrañamiento")]
            },
            {
                letter: "i",
                answer: "iglesia",
                status: 0,
                question: [("CON LA I. Templo cristiano"), ("CON LA I. Templo cristiano"), ("CON LA I. Templo cristiano")]
            },
            {
                letter: "j",
                answer: "jabali",

                status: 0,
                question: [("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"), ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"), ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba")]
            },
            {
                letter: "k",
                answer: "kamikaze",

                status: 0,
                question: [("CON LA K. Persona que se juega la vida realizando una acción temeraria"), ("CON LA K. Persona que se juega la vida realizando una acción temeraria"), ("CON LA K. Persona que se juega la vida realizando una acción temeraria")]
            },
            {
                letter: "l",
                answer: "licantropo",
                status: 0,
                question: [("CON LA L. Hombre lobo"), ("CON LA L. Hombre lobo"), ("CON LA L. Hombre lobo")]
            },
            {
                letter: "m",
                answer: "misantropo",

                status: 0,
                question: [("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"), ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"), ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas")]
            },
            {
                letter: "n",
                answer: "necedad",
                status: 0,
                question: [("CON LA N. Demostración de poca inteligencia"), ("CON LA N. Demostración de poca inteligencia"), ("CON LA N. Demostración de poca inteligencia")]
            },
            {
                letter: "ñ",
                answer: "señal",

                status: 0,
                question: [("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."), ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."), ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.")]
            },
            {
                letter: "o",
                answer: "orco",

                status: 0,
                question: [("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"), ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"), ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien")]
            },
            {
                letter: "p",
                answer: "protoss",

                status: 0,
                question: [("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"), ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft")]
            },
            {
                letter: "q",
                answer: "queso",

                status: 0,
                question: [("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"), ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"), ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche")]
            },
            {
                letter: "r",
                answer: "raton",
                status: 0,
                question: [("CON LA R. Roedor"), ("CON LA R. Roedor"), ("CON LA R. Roedor")]
            },
            {
                letter: "s",
                answer: "stackoverflow",

                status: 0,
                question: [("CON LA S. Comunidad salvadora de todo desarrollador informático"), ("CON LA S. Comunidad salvadora de todo desarrollador informático"), ("CON LA S. Comunidad salvadora de todo desarrollador informático")]
            },
            {
                letter: "t",
                answer: "terminator",

                status: 0,
                question: [("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"), ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"), ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984")]
            },
            {
                letter: "u",
                answer: "unamuno",

                status: 0,
                question: [("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"), ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"), ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914")]
            },
            {
                letter: "v",
                answer: "vikingos",

                status: 0,
                question: [("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"), ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"), ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa")]
            },
            {
                letter: "w",
                answer: "sandwich",

                status: 0,
                question: [("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"), ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"), ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso")]
            },
            {
                letter: "x",
                answer: "botox",

                status: 0,
                question: [("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"), ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"), ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética")]
            },
            {
                letter: "y",
                answer: "peyote",

                status: 0,
                question: [("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"), ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"), ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos")]
            },
            {
                letter: "z",
                answer: "zen",

                status: 0,
                question: [("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"), ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"), ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional")]
            }];

        this.Q_UNANSWERED = 0;
        this.Q_CORRECT = 1;
        this.Q_INCORRECT = 2;
        this.Q_PASAPALABRA = 3;
        this.NO_QUESTIONS = -1;
    }

    getCountByQuestionType(scoreTypeWanted) {
        return this.data.filter(elem => elem.status === scoreTypeWanted).length;
    }

    * questionMaker(filterKey) {
        for (let elem of this.data) {
            if (elem.status == filterKey) {
                const nextQuestionArray = elem.question;
                if (!Array.isArray(nextQuestionArray)) {
                    throw new Error("Error: question data is malformed");
                }
                nextQuestionArray.push(nextQuestionArray.shift()); // otra pregunta la próxima vez
                yield elem;
            }
        }
    };


    markQuestion(letter, code) {
        const matchingQuestion = this.data.find(elem => elem.letter === letter);
        if (matchingQuestion === undefined) {
            logBad(`markQuestion: Error, matching question not found for letter ${letter}`);
            throw(new Error("Question data is malformed"));
            return;
        }
        matchingQuestion.status = code;

    };

    checkAnswer(answer, letter) {
        const matchingQuestion = this.data.find(elem => elem.letter === letter);
        if (matchingQuestion === undefined) {
            logBad(`checkAnswer: Error, matching question not found for letter ${letter}`);
            return;
        }

        return answer === matchingQuestion.answer;
    }

    reInit() {
        this.data.forEach(elem => elem.status = this.Q_UNANSWERED);
    }

    getLetters() {
        return this.data.map(element => element.letter);
    }
}


const questionGenerator = new QuestionGenerator();
const tablero = {


    letras: questionGenerator.getLetters(),

    letterDisplay: document.getElementById('letter-display'),

    layout() {
        const radius = 250;
        const origin = {x: 325, y: 325};


        const count = this.letras.length;
        for (let i = 0; i < count; i++) {
            const diva = document.createElement('div');
            const letter = diva.id = this.letras[i];
            this.letterDisplay.appendChild(diva);
            diva.classList.add(LETTER_NORMAL_CLASS);
            diva.innerHTML = "<span>" + letter.toUpperCase() + "</span>";
            let {x, y} = this.returnCoords(origin.x, origin.y, this.degreesToRad((360 / count) * i), radius);
            let width = window.getComputedStyle(diva).getPropertyValue('width');
            let height = window.getComputedStyle(diva).getPropertyValue('height');
            diva.style.left = x - Number.parseFloat(width) + "px";
            diva.style.top = y - Number.parseFloat(height) + "px";
        }
    },
    degreesToRad(degrees) {
        return degrees * (Math.PI / 180);

    },

    radToDegrees(rad) {
        return radians * (180 / Math.PI);

    },

    returnCoords(originX = 0, originY = 0, radians, radius) {
        let x = originX + (Math.cos(radians) * radius);
        let y = originY + (Math.sin(radians) * radius);
        return ({x, y});
    },

    get letters() {
        return this.letterDisplay.getElementsByTagName('div');

    },

    init() {
        this.layout();
    },

};


class UserInteraction {

    constructor() {
        this.output = document.getElementById("message");
        this.questionSpace = document.getElementById("questionSpace");
        this.input = document.getElementById("input");
        this.promptField = document.getElementById("inputLabel")
        this.pasapalabraButton = document.getElementById("pasapalabraButton");
        this.terminarButton = document.getElementById("terminarButton");
        this.END_GAME_EARLY = "end";
        this.PASAPALABRA = "pasapalabra";

        this.acceptResponse = false;
        this.nextAction = null;
        this.hideButtons();
        this.addInputEventListeners();
    }


    hideButtons() {
        TweenMax.to([this.pasapalabraButton, this.terminarButton], 0.2, {className:"buttonHidden"});
    }

    showButtons() {
        TweenMax.to([this.pasapalabraButton, this.terminarButton], 0.2, {className:"buttonVisible"});
    }

    hideInput() {
        debug("hiding input");
        console.trace();
        TweenMax.to([this.input, this.promptField], 0.2, {alpha: 0});
    }

    showInput() {
        debug("showing input");
        TweenMax.to([this.input, this.promptField], 0.2, {alpha: 1});
    }

    hideQuestion() {
        TweenMax.to(this.questionSpace, 0.2, {alpha: 0});
    }

    showQuestion() {
        TweenMax.to(this.questionSpace, 0.2, {alpha: 1});
    }

    //  this.eventHandlers = new Map();

    clearMessage() {
        this.output.innerHTML = "";
    }

    logInfo(text) {
        this.log((text));
    }

    logBad(text) {
        this.log((text));
    }

    logGood(text) {
        this.log((text));
    }

    logScore(text) {
        this.log((text));
    }

    log(text) {
        debug("logging", text);
        this.output.innerHTML = "<span class='textSnazz'>" + text + "</span>";
        debug(this.output.innerHTML);
    }

    poseQuestion(text) {
        this.showQuestion();
        this.showButtons();
        this.questionSpace.innerHTML = "<span class='textSnazz'>" + text + "</span>";
        this.showInput();
    }

    close() {
        this.hideQuestion();
        this.hideButtons();
        this.hideInput();
        //    this.removeInputEventListeners();
        //  this.clearMessage();
    }

    open(callback, clearMsg = true) {
        this.showInput();
        this.nextAction = callback;
        this.acceptResponse = true;
        if (clearMsg) {
            this.clearMessage()
        }
        this.input.value = "";
        this.input.focus();
    }


    goToNextAction(...params) {
        if (this.acceptResponse && this.nextAction) {
            const tmp = this.nextAction;
            this.nextAction = null;
            this.acceptResponse = false;
            tmp(...params);
        }
    }

    addInputEventListeners() {
        this.input.addEventListener('keypress', e => {

            if (e.which == ENTER_KEY || e.keyCode == ENTER_KEY) {
                this.goToNextAction(e, this.input.value);
            }
        });

        // this.inputButton.addEventListener('click', e => this.goToNextAction(e, "scoreboard"));
        this.pasapalabraButton.addEventListener('click', e => this.goToNextAction(e, this.PASAPALABRA));
        this.terminarButton.addEventListener('click', e => this.goToNextAction(e, this.END_GAME_EARLY));
    }


    getUserName(callback) {
        this.open(callback);
        this.prompt('¿Cómo te llamas? ');
    }

    playAgainPrompt(callback) {
        debug("playAgainPrompt");
        this.open(callback, false);
        this.prompt('¿Quieres jugar otra vez? (Y/N) ');
    }

    getUserResponse(callback) {
        this.open(callback);
        this.prompt('¿Cuál es la palabra? ');
    }

    prompt(text) {

        this.promptField.innerHTML = text;
    }


}

class Scoreboard {
    constructor() {
        this.users = [];
        //  this.users = [{name: "john", score: 234}, {name: "rex", score: 634}, {name: "frank", score: 34}];
        this.scoreboard = document.getElementById('scoreBoard');
        this.cerrar = document.getElementById('cerrar');
        this.scores = document.getElementById("scores");

        this.ROW_CLASS = "tableRow";
        this.CELL_CLASS = "tableCell";
        this.HEADER_CLASS = "tableHeader";
        this.closed = true;
        this.tweening = false;
        this.cerrar.addEventListener('click', _ => {
            this.close();
        })
    }

    addUser(user) {
        if (user.name !== "" && user.score >= 0) {
            this.users.push(user);
            this.users.sort((a, b) => b.score - a.score);
        } else {
            debug("Error: user data invalid");
        }
    }


    showScoreboard() {

        let text = "";
        text += `<div class=${this.HEADER_CLASS}><div class = ${this.CELL_CLASS}>Jugador</div> <div class = ${this.CELL_CLASS}>Resultado</div></div>`;
        if (this.users.length) {
            this.users.forEach(elem => text += `<div class=${this.ROW_CLASS}><div class=${this.CELL_CLASS}>${elem.name}</div><div class=${this.CELL_CLASS}>${elem.score}</div></div>`);
        }
        this.scores.innerHTML = text;
    }


    closeComplete() {
        this.tweening = false;
        this.closed = true
    }

    openComplete() {
        debug("open complete", this.tweening, this.closed);
        this.tweening = false;
        this.closed = false
    }

    close() {

        if (this.closed || this.tweening) {
            return;
        }
        TweenMax.to(this.scoreboard, 0.2, {
            className: "scoreboardClosed",
            onComplete: this.closeComplete,
            callbackScope: this
        });
    }

    open() {

        if (!this.closed || this.tweening) {
            return;
        }
        this.showScoreboard();
        TweenMax.to(this.scoreboard, 0.2, {
            className: "scoreboardOpen",
            onComplete: this.openComplete,
            callbackScope: this
        });
    }


}

class User {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

class Animation {

    constructor(tablero) {
        this.tablero = tablero;

        this.CORRECT = "correct";
        this.INCORRECT = "incorrect";
        this.PASAPALABRA = "pasaspalabra";
        this.CORRECT_CLASS = "letterCorrect";
        this.PASAPALABRA_CLASS = "letterPasapalabra";
        this.INCORRECT_CLASS = "letterIncorrect";

        this.letters = Array.from(this.tablero.letters);

    }

    setLetter(letter, status) {

        const element = document.getElementById(letter);
        TweenMax.to(element, .5, {className: "-=letterNormal"});
        TweenMax.to(element, .5, {className: "-=letterBig", overwrite: "none"});

        switch (status) {
            case this.CORRECT:
                TweenMax.to(element, .5, {className: "+=letterCorrect", overwrite: "none"});

                // element.classList.add(this.CORRECT_CLASS);
                break;
            case this.INCORRECT:
                TweenMax.to(element, .5, {className: "+=letterIncorrect", overwrite: "none"});

                // element.classList.add(this.INCORRECT_CLASS);
                break;
            case this.PASAPALABRA:
                TweenMax.to(element, .5, {className: "+=letterPasapalabra", overwrite: "none"});

                //    element.classList.add(this.PASAPALABRA_CLASS);
                break;
            default:
                debug("Error in assigning letter class", letter, status, element);
                break;
        }
    }

    animate(letter, callback, callbackContext) {

        let tmparr = this.arrayWithLetterAtStart(letter);

        const tweenTime = .25;
        const staggerTime = .05;

        tmparr = tmparr.concat(tmparr.slice(0, 1));


        const tweens = TweenMax.staggerTo(tmparr, tweenTime, {
            repeat: 1,
            className: "letterBig",
            yoyo: true,
            ease: Power1.easeInOut,
        }, staggerTime, callback, [], callbackContext);
        tweens.pop().repeat(0);


    }

    reset() {

        TweenMax.to(this.letters, 0.2, {className: "letterNormal"});
    }


    arrayWithLetterAtStart(letter) {
        debug("arrayFRomLetter")
        let arr = this.letters.slice();

        const index = arr.findIndex(elem => elem.id === letter)
        if (index === -1) {
            debug("letter", letter, "not found");
            return;
        }

        arr = arr.concat(arr.splice(0, index));
        return arr;
    }

}

class Game {
    constructor() {
        this.qGenerator = null;
        this.userInteraction = null;
        this.scoreboard = null;

        this.END_GAME = "end";
        this.PASAPALABRA = "pasapalabra";
        this.ENDED_EARLY = "Has terminado el juego";
        this.ROUND_TIME = 130 * 1000;
        this.RONDA_PRIMERA = 0;
        this.RONDA_SEGUNDA = 1;

        this.userName = "";
        this.currentQuestionData = null;
        this.gameOver = false;

        this.rondaActual = this.RONDA_PRIMERA;

        this.questionIterable = null;
    }

    handleErr(err) {
        this.logBad(`Error! ${err}`);
    }

    cleanString(str) {
        return str.toLowerCase().trim();
    }

    init() {
        this.qGenerator = new QuestionGenerator();
        this.userInteraction = new UserInteraction();

        this.animation = new Animation(tablero);
        this.scoreboard = new Scoreboard();
        this.questionIterable = this.qGenerator.questionMaker(this.qGenerator.Q_UNANSWERED);
    }

    startGame() {

        this.userInteraction.logInfo("\n\n¡Empezamos!\n\n");
        this.userInteraction.getUserName(this.storeUserName.bind(this));
    }

    storeUserName(event, result) {
        this.userInteraction.close();
        debug("event,result", event, result);
        this.userName = result.trim();
        if (this.userName == "" || !charsNumSpacesRegex.test(this.userName)) {
            debug("Tu nombre solo puede contener letras, números, espacios y guiones, y no puede ser vacío");
            this.userInteraction.logBad("Tu nombre solo puede contener letras, números, espacios y guiones, y no puede ser vacío");
            this.userInteraction.getUserName(this.storeUserName.bind(this));
        } else {
            debug(`\n\n¡Hola, ${this.userName}!\n\n`)
            this.userInteraction.logInfo(`\n\n¡Hola, ${this.userName}!\n\n`);

            this.doNextRound();
        }
    }

    playAgain(event, result) {
        this.userInteraction.close();

        this.scoreboard.close();
        result = result.charAt(0).toLowerCase();
        if (result === "y") {
            this.qGenerator.reInit();
            this.questionIterable = this.qGenerator.questionMaker(this.qGenerator.Q_UNANSWERED);
            this.animation.reset();
            this.gameOver = false;
            this.rondaActual = this.RONDA_PRIMERA;
            this.startGame();

        } else if (result === "n") {
            this.userInteraction.logInfo(`¡Gracias, ${this.userName}, por haber jugado!`)
        } else {
            this.userInteraction.logBad("No se entiende esta respuesta");
            this.userInteraction.playAgainPrompt(this.playAgain.bind(this));
        }
    }

    endGameNormal() {

        const user = new User(this.userName, this.qGenerator.getCountByQuestionType(this.qGenerator.Q_CORRECT));
        this.scoreboard.addUser(user);
        this.scoreboard.open();

        this.userInteraction.logInfo(`¡El juego se ha terminado!¡Gracias, ${this.userName}, por haber jugado!`)
        this.gameOver = true;

        this.userInteraction.playAgainPrompt(this.playAgain.bind(this));
    }

    endGameEarly() {
        this.userInteraction.open();
        const user = new User(this.userName, this.qGenerator.getCountByQuestionType(this.qGenerator.Q_CORRECT));
        this.scoreboard.addUser(user);
        this.scoreboard.open();

        this.userInteraction.logInfo(`\n\nHas terminado el juego antes!\n\n`);
       // this.userInteraction.logScore(`Has acertado ${this.qGenerator.getCountByQuestionType(this.qGenerator.Q_CORRECT)} palabras`);
        this.gameOver = true;
        this.userInteraction.playAgainPrompt(this.playAgain.bind(this));

    }

    askQuestion() {
        this.userInteraction.poseQuestion(this.currentQuestionData.question[0]);
        this.timer = setTimeout(this.timedOut.bind(this), this.ROUND_TIME);
        this.userInteraction.getUserResponse(this.checkAnswer.bind(this));
    }

    prepSecondRound() {
        this.userInteraction.logInfo("¡Repasamos las palabras pasadas!");
        this.rondaActual = this.RONDA_SEGUNDA;
        this.questionIterable = this.qGenerator.questionMaker(this.qGenerator.Q_PASAPALABRA);
        const response = this.questionIterable.next();
        this.currentQuestionData = response.value;
        debug("response", response, this.currentQuestionData);
        return !response.done;
    };


    doNextRound() {
        this.userInteraction.close();

        if (this.gameOver) {
            return;
        }

        const response = this.questionIterable.next();
        this.currentQuestionData = response.value;

        if (response.done) {

            if (this.rondaActual === this.RONDA_PRIMERA) {
                if (this.prepSecondRound()) {
                    this.animation.animate(this.currentQuestionData.letter, this.askQuestion, this);
                } else {
                    debug("ending game normally first round no pasapalabras");
                    this.endGameNormal();
                }

            } else {
                debug("ending game normally second round");
                this.endGameNormal();
            }

        } else {
            this.animation.animate(this.currentQuestionData.letter, this.askQuestion, this);


        }
    }

    timedOut() {
        this.timedOutFlag = true;
        logBad("\n\nDesgraciadamente no has respondido en el tiempo asignado\n\n");

        this.qGenerator.markQuestion(this.currentQuestionData.letter, this.qGenerator.Q_INCORRECT);
        this.currentQuestionData = null;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timedOutFlag = false;
        }
        this.doNextRound();
    }

    checkAnswer(event, result) {
        if (this.timedOutFlag) {
            logBad("Error, timed out");
            return;
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timedOutFlag = false;
        }

        const answer = this.cleanString(result);

        const letter = this.currentQuestionData.letter;

        switch (true) {


            case answer === this.END_GAME:
                this.endGameEarly(answer);
                break;
            case answer === this.PASAPALABRA && this.rondaActual == this.RONDA_PRIMERA:
                this.userInteraction.logInfo("¡Vale! Has guardado esta palabra para la próxima ronda");
                this.qGenerator.markQuestion(letter, this.qGenerator.Q_PASAPALABRA);
                this.animation.setLetter(letter, this.animation.PASAPALABRA);

                break;
            case answer === this.PASAPALABRA && this.rondaActual == this.RONDA_SEGUNDA:
                this.userInteraction.logBad("No se puede pasar la palabra ahora -- no has acertado esta palabra");
                this.qGenerator.markQuestion(letter, this.qGenerator.Q_INCORRECT);
                this.animation.setLetter(letter, this.animation.INCORRECT);

                break;
            default:
                if (this.qGenerator.checkAnswer(answer, this.currentQuestionData.letter)) {
                    this.userInteraction.logGood(`\n\n¡Has acertado! '${answer}' es correcto.\n\n`);
                    this.qGenerator.markQuestion(letter, this.qGenerator.Q_CORRECT);
                    this.animation.setLetter(letter, this.animation.CORRECT);
                } else {
                    this.userInteraction.logBad("\n\nDesgraciadamente, no...\n\n");

                    this.qGenerator.markQuestion(letter, this.qGenerator.Q_INCORRECT);
                    this.animation.setLetter(letter, this.animation.INCORRECT);

                }
                break;
        }

        this.currentQuestionData = null;
        this.doNextRound();
    }

}

window.addEventListener('load', init);

function init() {
    window.removeEventListener('load', init);

    tablero.init();

    const game = new Game();
    game.init();
    game.startGame();


}



