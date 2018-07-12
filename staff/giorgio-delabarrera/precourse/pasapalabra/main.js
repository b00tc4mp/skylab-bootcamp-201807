// Resource: https://www.youtube.com/watch?v=xJp2c_rcHDc

// Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario
// deberá adivinar que palabra estamos tratando, por ejemplo:

// '>>>'With the letter "M", Capital of Spain, located in the center of the country.
// '>>>' "Madrid"
// '>>>'Correct, you have 1 Point!

// Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo
// respondido todas las letras, deberá indicarle al usuario cuantas letras ha fallado y cuantas ha 
// acertado. Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender 
// que en ese momento, el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará
// para la siguiente ronda. El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre
// y ordenados por cantidad de letras acertadas.

function dialog(message, initial) {
  // @TODO: controlar initial como parametro opcional
  var response = prompt(message, initial);
  if (typeof response === 'string') response = response.trim();
  return response;
}

function askPlayerName() {
  return dialog('Introduce tu nombre por favor');
}

function askEndMatch() {
  return confirm('¿Deseas terminar la partida?');
}

function askQuestion(question) {
  var message = getQuestionRuleMessage(question);
  message += '\n' + question.name;
  message += '\n\nIntroduce "pasapalabra" si deseas saltar la pregunta.';
  return dialog(message, 'pasapalabra');
}

function askPlayAgain() {
  return confirm('¿Empezar nueva partida?');
}

function getQuestionRuleMessage(question) {
  var message = '';
  if (question.rule == 'starts') {
    message += 'Con la letra "' + question.letter.toUpperCase() + '"';
  }
  else if (question.rule == 'contains') {
    message += 'Contiene la letra "' + question.letter.toUpperCase() + '"';
  }
  return message;
}

function generateQuestions() {
  // @TODO: generate more random questions
  return [
    { letter: "a", answer: "abducir", rule: 'starts', name: 'Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien' },
    { letter: "b", answer: "bingo", rule: 'starts', name: 'Juego que ha sacado de quicio a todos los \'Skylabers\' en las sesiones de precurso' },
    { letter: "c", answer: "churumbel", rule: 'starts', name: 'Niño, crío, bebé' },
    { letter: "d", answer: "diarrea", rule: 'starts', name: 'Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida' },
    { letter: "e", answer: "ectoplasma", rule: 'starts', name: 'Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación' },
    { letter: "f", answer: "facil", rule: 'starts', name: 'Que no requiere gran esfuerzo, capacidad o dificultad' },
    { letter: "g", answer: "galaxia", rule: 'starts', name: 'Conjunto enorme de estrellas, polvo interestelar, gases y partículas' },
    { letter: "h", answer: "harakiri", rule: 'starts', name: 'Suicidio ritual japonés por desentrañamiento' },
    { letter: "i", answer: "iglesia", rule: 'starts', name: 'Templo cristiano' },
    { letter: "j", answer: "jabali", rule: 'starts', name: 'Variedad salvaje del cerdo que sale en la película \'El Rey León\', de nombre Pumba' },
    { letter: "k", answer: "kamikaze", rule: 'starts', name: 'Persona que se juega la vida realizando una acción temeraria' },
    { letter: "l", answer: "licantropo", rule: 'starts', name: 'Hombre lobo' },
    { letter: "m", answer: "misantropo", rule: 'starts', name: 'Persona que huye del trato con otras personas o siente gran aversión hacia ellas' },
    { letter: "n", answer: "necedad", rule: 'starts', name: 'Demostración de poca inteligencia' },
    { letter: "ñ", answer: "señal", rule: 'contains', name: 'Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.' },
    { letter: "o", answer: "orco", rule: 'starts', name: 'Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien' },
    { letter: "p", answer: "protoss", rule: 'starts', name: 'Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft' },
    { letter: "q", answer: "queso", rule: 'starts', name: 'Producto obtenido por la maduración de la cuajada de la leche' },
    { letter: "r", answer: "raton", rule: 'starts', name: 'Roedor' },
    { letter: "s", answer: "stackoverflow", rule: 'starts', name: 'Comunidad salvadora de todo desarrollador informático' },
    { letter: "t", answer: "terminator", rule: 'starts', name: 'Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984' },
    { letter: "u", answer: "unamuno", rule: 'starts', name: 'Escritor y filósofo español de la generación del 98 autor del libro \'Niebla\' en 1914' },
    { letter: "v", answer: "vikingos", rule: 'starts', name: 'Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa' },
    { letter: "w", answer: "sandwich", rule: 'contains', name: 'Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso' },
    { letter: "x", answer: "botox", rule: 'contains', name: 'Toxina bacteriana utilizada en cirujía estética' },
    { letter: "y", answer: "peyote", rule: 'contains', name: 'Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos' },
    { letter: "z", answer: "zen", rule: 'starts', name: 'Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional' },
  ];
}

function initializeUser(name) {
  return {
    name: name,
    answers: [
      { letter: "a", status: null },
      { letter: "b", status: null },
      { letter: "c", status: null },
      { letter: "d", status: null },
      { letter: "e", status: null },
      { letter: "f", status: null },
      { letter: "g", status: null },
      { letter: "h", status: null },
      { letter: "i", status: null },
      { letter: "j", status: null },
      { letter: "k", status: null },
      { letter: "l", status: null },
      { letter: "m", status: null },
      { letter: "n", status: null },
      { letter: "ñ", status: null },
      { letter: "o", status: null },
      { letter: "p", status: null },
      { letter: "q", status: null },
      { letter: "r", status: null },
      { letter: "s", status: null },
      { letter: "t", status: null },
      { letter: "u", status: null },
      { letter: "v", status: null },
      { letter: "w", status: null },
      { letter: "x", status: null },
      { letter: "y", status: null },
      { letter: "z", status: null },
    ],
    score: 0,
  }
}

function getQuestionByLetter(questions, letter) {
  var questionLocated = null;
  for (var question of questions) {
    if (question.letter === letter) {
      questionLocated = question;
      break;
    }
  }
  return questionLocated;
}

function getPendingUserAnswers(user) {
  return user.answers.filter(function(userAnswer) {
    return userAnswer.status === null;
  });
}

function hasPendingUserAnswers(user) {
  return (getPendingUserAnswers(user).length > 0) ? true : false;
}

function getCorrectUserAnswers(user) {
  return user.answers.filter(function(userAnswer) {
    return userAnswer.status === true;
  });
}

function getIncorrectUserAnswers(user) {
  return user.answers.filter(function(userAnswer) {
    return userAnswer.status === false;
  });
}

function indexOfUserAnswersByLetter(user, letter) {
  var index = -1;
  var answers = user.answers;
  for (var key in answers) {
    var answer = answers[key];
    if (answer.letter === letter) {
      index = key;
      break;
    }
  }
  return index;
}

function updateUserAnswer(user, letter, status) {
  // update answer
  var indexUserAnswer = indexOfUserAnswersByLetter(user, letter);
  if (indexUserAnswer !== -1) {
    user.answers[indexUserAnswer].status = status;
  }
  // update score
  var score = 0;
  var userAnswers = user.answers;
  for (var userAnswer of userAnswers) {
    if (userAnswer.status === true) {
      score = score + 1;
    }
  }
  user.score = score;
  return user;
}

function pluralize(count, one, many) {
  return (count === 1) ? one : many;
}

function printStatusOfUserAnswer(user, status) {
  if (status === true) {
    console.log('Correcto, tienes %d %s!', user.score, pluralize(user.score, 'Punto', 'Puntos'));
  } else {
    console.log('Incorrecto');
  }
}

function printResultsOfUser(user) {
  var numCorrectUserAnswers = getCorrectUserAnswers(user).length;
  var numIncorrectUserAnswers = getIncorrectUserAnswers(user).length;
  console.log('Has terminado la partida con %d %s %s y %d %s %s',
    numCorrectUserAnswers,
    pluralize(numCorrectUserAnswers, 'letra', 'letras'),
    pluralize(numCorrectUserAnswers, 'acertada', 'acertadas'),
    numIncorrectUserAnswers,
    pluralize(numIncorrectUserAnswers, 'letra', 'letras'),
    pluralize(numIncorrectUserAnswers, 'fallida', 'fallidas')
  );
}

function printRanking(ranking) {
  ranking.sort(function(userA, userB) {
    return userB.score - userA.score;
  });
  console.log('\n\nRanking');
  for (var i = 0; i < ranking.length; i++) {
    var user = ranking[i];
    console.log('%d. %s, %d %s %s', 
      i + 1, 
      user.name, 
      user.score, 
      pluralize(user.score, 'letra', 'letras'),
      pluralize(user.score, 'acertada', 'acertadas')
    );
  }
}

function match(ranking) {

  var pasapalabraCompleted = false;

  // ask name
  var name = '';
  var endMatch = false;
  var ask;
  do {
    ask = false;
    name = askPlayerName();
    if (name === null) {
      endMatch = askEndMatch();
      if (endMatch === true) {
        ranking.push(user);
        return pasapalabraCompleted;
      }
      ask = (endMatch === true) ? false : true;
    }
    if (name === '') {
      console.log('\nDebes introducir un nombre');
      ask = true;
    }
  } while (ask === true);

  var user = initializeUser(name);
  console.log('\nHola ' + user.name);

  var questions = generateQuestions();
  
  do {
    var pendingUserAnswers = getPendingUserAnswers(user);
    for (var pendingUserAnswer of pendingUserAnswers) {
      var question = getQuestionByLetter(questions, pendingUserAnswer.letter);
      
      // ask question
      var response = '';
      var endMatch = false;
      var ask;
      do {
        ask = false;
        console.log('\n' + getQuestionRuleMessage(question) + '. ' + question.name);
        response = askQuestion(question);
        if (response === null) {
          endMatch = askEndMatch();
          if (endMatch === true) {
            ranking.push(user);
            return pasapalabraCompleted;
          }
          ask = (endMatch === true) ? false : true;
        }
        if (response === '') {
          console.log('\nDebes introducir una respuesta o la palabra "pasapalabra" si deseas saltar la pregunta');
          ask = true;
        }
      } while (ask === true);
      console.log(' >>> ' + response);

      // check answer
      response = response.toLowerCase();
      if (response !== 'pasapalabra') {
        var status = (response === question.answer) ? true : false;
        user = updateUserAnswer(user, question.letter, status);
        printStatusOfUserAnswer(user, status);
      }
    }
  } while (hasPendingUserAnswers(user) === true);

  pasapalabraCompleted = true;
  ranking.push(user);
  
  console.log('\nGracias por jugar al Pasapalabra.');
  printResultsOfUser(user);

  return pasapalabraCompleted;
}

function pasapalabra() {
  var ranking = [];
  var playAgain;
  do {
    playAgain = false;
    var isPasapalabra = match(ranking);
    if (isPasapalabra === true) {
      playAgain = askPlayAgain();
    }
  } while (playAgain === true);

  printRanking(ranking);
}

pasapalabra();
