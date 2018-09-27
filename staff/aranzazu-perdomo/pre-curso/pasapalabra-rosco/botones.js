
var userName = document.getElementById('user_name').value;
var arrayOfRanking= [
{user: 'Jhon Nieve', points: 21},
{user: 'Daenerys Targaryen', points: 20},
{user: 'Tyrion Lannister', points: 15},];
var rankingName= ['Jhon Nieve','Daenerys Targaryen','Tyrion Lannister'];
var preguntas = 0;
var correcto = 0;
var incorrecto = 0;



//Botón volver a menú principal
function returnToMenu() {
	document.getElementById('play_menu').style.display = 'block';
	document.getElementById('name_intro').style.visibility = "hidden";
	
	document.getElementById('container_best_players').style.visibility = 'hidden';
	document.getElementById('container_menu').style.visibility = "visible";
	document.getElementById('container_instructions').style.visibility = "hidden";
}




//Panel nuevo ususario visible
function newUserIntro() {
	document.getElementById('user_name').value = "";
	document.getElementById('name_intro').style.visibility = "visible";
	document.getElementById('alert_user').style.visibility = 'hidden';
	document.getElementById('user_name').focus()
}

//Introducción de nuevo usuario 
function newUser() {
	userName = document.getElementById('user_name').value;
	userName = userName.toUpperCase();
	if (userName === '') {
	} else if (rankingName.indexOf(userName) === -1) {
		rankingName.push(userName);
		document.getElementById('container_menu').style.visibility = "hidden";
		document.getElementById('play_menu').style.display = 'none';
		document.getElementById('container_game').style.visibility = "visible";
		document.getElementById('correct').innerHTML = "Aciertos";
		document.getElementById('incorrect').innerHTML = "Errores";
		document.getElementById('correct').style.color = "white";
		document.getElementById('incorrect').style.color = "white";
		preguntas = 0;
		correcto = 0;
		incorrecto = 0;
		for(var i = 0; i < questions.length; i++) {
			questions[i].status = 0;
			document.getElementsByClassName('results')[i].style.backgroundColor = 'white';
		}
		gameQuestions();
		timer();
	} else {
		document.getElementById('alert_user').style.visibility = 'visible';
		setTimeout(newUserIntro, 2000);
	};
	document.getElementById('answer').focus()
}

    //Mostrar clasificación desde menú principal
function showBestPlayers() {
	document.getElementById('container_menu').style.visibility = "hidden";
	document.getElementById('container_best_players').style.visibility = "visible";
	document.getElementById('name_intro').style.visibility = "hidden";
}
//Mostrar instrucciones del juego
function showInstructions() {
	document.getElementById('container_menu').style.visibility = "hidden";
	document.getElementById('container_instructions').style.visibility = "visible";
	document.getElementById('name_intro').style.visibility = "hidden";
}

//Generar usuario y puntuación
function userGenerator() {
	arrayOfRanking.push({
		user: userName, 
		points: correcto,
	});
}

//Generar clasificación de usuarios
function generateBestPlayers() {
	document.getElementById('container_menu').style.visibility = "hidden";
	document.getElementById('container_game').style.visibility = "hidden";
	document.getElementById('container_best_players').style.visibility = "visible";
	function list() {
		function gameRanking() {
			arrayOfRanking.sort(function (a, b){
				return (b.points - a.points)
			});
		}
		gameRanking();
		var filterUser = arrayOfRanking.filter(function(value) {
			return (value.user)
		});
		for(var i = 0; i < filterUser.length; i++) {
			document.getElementById('first').innerHTML = ('<span style="color:orange">' + filterUser[0].user + '</span>' + ' con un total de: ' + filterUser[0].points + ' puntos');
			document.getElementById('second').innerHTML = ('<span style="color:orange">' + filterUser[1].user + '</span>' + ' con un total de: ' + filterUser[1].points + ' puntos');
			document.getElementById('third').innerHTML = ('<span style="color:orange">' + filterUser[2].user + '</span>' + ' con un total de: ' + filterUser[2].points + ' puntos');
			
		};
	}
	list()
}





