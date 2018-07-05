function buildUI(questions) {

	// círculo de botones con letras
	var dt = 2.*Math.PI/questions.length;
	var r = 250;
	var x0 = 300;
	var y0 = 300;
	var relative = `z-index: 1;position: absolute;`
	for(var i=0; i<questions.length; i++) {
		var letra = questions[i].letter.toUpperCase();

		var t = i*dt + 0.5*Math.PI;
		var x = x0 - r*Math.cos(t);
		var y = y0 - r*Math.sin(t);
		var position = setMargins(x,y); 

		var text = `<button style="${relative}${position}" id="${letra}" class="letra"> ${letra} </button>`
		addHTML(text);
	}

	// boton start/stop
	var position = setMargins(x0-0.5*r,y0-0.3*r); 
	var text = `<button id="start" class="start" style="${relative}${position}"> JUGAR </button>`;
	addHTML(text);

	// marcador
	var position = setMargins(x0-0.1*r,y0-0.28*r); 
	var text = `<p id="marcador" style="${relative}${position}"> Aciertos: 0 </p>`;
	addHTML(text);

	// temportizador
	var position = setMargins(x0+0.3*r,y0-0.28*r); 
	var text = `<p id="temp" style="${relative}${position}"> Tiempo: 0 s </p>`;
	addHTML(text);

	// definición
	var position = setMargins(x0-0.65*r,y0-0.1*r); 
	var size = setSize(1.5*r,0.4*r);
	var text = `<p id="def" style="${relative}${position}${size}">  </p>`;
	addHTML(text);

	// respuesta
	var position = setMargins(x0-0.3*r,y0+0.5*r); 
	var size = setSize(0.8*r,0.1*r);
	var text = `<input id="respuesta" style="${relative}${position}${size}">`;
	addHTML(text);

	// funciones

	function addHTML(text) {
		document.getElementById("juego").insertAdjacentHTML('beforeend', text);
	}

	function setMargins(left, top) {
		return `margin-left: ${left}px; margin-top: ${top}px;`; 
	}

	function setSize(width, height) {
		return `width: ${width}px; height: ${height}px;`;
	}

}

// temporizador

var tempId;
function startTimer() {
	var temp = document.getElementById("temp");
	var t = 0;
	tempId = window.setInterval(function() {
		t++;
		temp.innerText = `Tiempo: ${t} s`;
		if(t > totalTime) {
			endGame();
			alert(`¡ TIEMPO ! Tu puntuación no entrará en el ranking.`);
		}
	}, 1000);
}

function stopTimer() {
	clearInterval(tempId);
}