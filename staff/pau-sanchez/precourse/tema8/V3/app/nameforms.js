

function askName1st(){
	var injectHtml = [];
	injectHtml.push(
		`<form  id="askName" action="#">
    		<label>Nombre primer jugador</label><br>
    		<input id="idNombre1" type="text" value=""/><br>
    		<input type="button" value="enviar" onclick="questions1stPlayer[0].name=getElementById("idNombre1").value, askName2nd();" />
		</form>`	
		
	);
	quiz.innerHTML = injectHtml.join("");
	document.getElementById("namePlayer1").innerHTML = questions1stPlayer[0].name


}

function askName2nd(){
	var injectHtml = [];
	injectHtml.push(
		`<form  id="askName" action="#">
    		<label>Nombre primer jugador</label><br>
    		<input id="idNombre2" type="text" value=""/><br>
    		<input type="button" value="enviar" onclick="questions2ndPlayer[0].name=getElementById("idNombre2").value, turn1stplayer();" />
		</form>`	
		
	);
	quiz.innerHTML = injectHtml.join("");
	document.getElementById("namePlayer2").innerHTML = questions2ndPlayer[0].name
}


