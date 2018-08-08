/*Pasapalabra Game! (Final JS) 🎮⁉️


Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario deberá adivinar que palabra estamos tratando, por ejemplo:

'>>>'With the letter "M", Capital of Spain, located in the center of the country.
'>>>' "Madrid"
'>>>'Correct, you have 1 Point!
Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha fallado y cuantas ha acertado. Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento, el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas.

PRO

Los usuarios deberán tener tiempo límite por cada juego, por ejemplo 130 segundos... Resource: https://www.w3schools.com/jsref/met_win_settimeout.asp
El programa no debería hacer distinciones entre mayúsculas, minúsculas... Ejemplo: "animal" == "ANIMAL" // "Animal" // "aNiMal"...
El programa debe estar preparado para aceptar el input "END" para terminar el juego en cualquier momento, si esto sucede, el programa dirá cuantas letras ha acertado pero no entrará en el ranking.
Prepara tu programa para que no repita siempre las mismas preguntas, por ejemplo, de la misma letra, se podrían hacer tres preguntas diferentes.
Ejemplo de preguntas y respuestas: made by => www.github.com/misan7 */


 


var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Ni�o, cr�o, beb�") },
    { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la funci�n del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia l�quida") },
    { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasm�tica. Los cazafantasmas med�an su radiaci�n") },
    { letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y part�culas") },
    { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japon�s por desentra�amiento") },
    { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la pel�cula 'El Rey Le�n', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acci�n temeraria") },
    { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversi�n hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostraci�n de poca inteligencia") },
    { letter: "�", answer: "se�al", status: 0, question: ("CONTIENE LA �. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fant�stico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnol�gicamente avanzada que se caracteriza por sus grandes poderes ps�onicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduraci�n de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador inform�tico") },
    { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Pel�cula del director James Cameron que consolid� a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y fil�sofo espa�ol de la generaci�n del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos n�rdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jam�n y queso") },
    { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en ciruj�a est�tica") },
    { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Peque�o c�ctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por ind�genas americanos") },
    { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabidur�a m�s all� del discurso racional") },
]



//funcio que retorna la paraula entrada a minuscules, per aixi poder comparar amb l'array.
function toLowerCase(word){
	word= word.toLowerCase();
	
	return word;
}

//paraula correcta
function encert(correctas, puntos){
	correctas++;
	console.log("Has acertado, tienes "  + puntos + " puntos");
	return correctas;
}

//paraula incorrecta
function fallo (falladas, puntos){
	console.log("Has fallado, tienes " + puntos + " puntos");
	falladas++;
	return falladas;
}
	

-

//pasapalabra
function pasapalabra(questions){
	var end = 1;
	var puntos = 0;
	var correctas= 0;
	var falladas= 0;
	var cntstatus=0;
	while (end == 1 ){
		for (var i=0; i<questions.length; i++){
			if (questions[i].status==0){
				var word= prompt (questions[i].question);
				word = toLowerCase(word);
	
				//encert
				if (word == questions[i].answer){
					puntos++;
					correctas=encert( correctas, puntos,);
					questions[i].status=1;
					cntstatus++;
					
					
				//final
				}else if ( word == "end"){
					end = 0;
				
				//pasapalabra
				} else if  (word == "pasapalabra"){
					console.log ("Saltamos a la siguiente");
								
				//falladas
				}else if (word != questions[i].answer) {
					puntos--;
					falladas=fallo(falladas, puntos);
					questions[i].status=1;
					cntstatus++;
					
				}
			}
			if ( cntstatus== 4){
				end=0;
			}
		}	
	}

	console.log("Has acertado "  + correctas + " y has fallado " + falladas + ". Tienes un total de " + puntos + " puntos");
	
}
