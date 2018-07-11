function pasapalabra (){
	var questions=[
			{ letter: "a", answer: "aimar", status: 0, question: ("CON LA A. Media punta argentino de 1,70m salido de River Plate que ha jugado en Argentina, España y Portugal. Retirado en 2007") },
			{ letter: "b", answer: "bojan", status: 0, question: ("CON LA B. Mil veces campeón del mundial con España y la mayoría de ellas máximo goleador y máximo asistente. Su chut es demoledor") },
			{ letter: "c", answer: "canales", status: 0, question: ("CON LA C. Fino estilista que juega en la demarcación de mediapunta. Zurdo. Nacido en Santander") },
	    	{ letter: "d", answer: "dugarry", status: 0, question: ("CON LA D. Pelo largo. Francés. Delantero. Traspasado del Milán al Fc Barcelona. 0 goles") },
	    	{ letter: "e", answer: "enke", status: 0, question: ("CON LA E. Portero alemán del Fc Barcelona. Amochó por motu propio") },
	    	{ letter: "f", answer: "fabregas", status: 0, question: ("CON LA F. Apellido del jugador que jugando el Fc Barcelona si lo veia el padre de Pau le daba un embarraque") },
	    	{ letter: "g", answer: "guiza", status: 0, question: ("CON LA G. Torrente es su película favorita. Torrente es su actor favorito. La de Torrente que grita Pescao es su actriz favorita") },
	    	{ letter: "h", answer: "hesp", status: 0, question: ("CON LA H. Bravo Caprabo. Portero holandés.") },
	    	{ letter: "i", answer: "iniesta", status: 0, question: ("CON LA I. De mi vida!! Se acaba de retirar con todos los honores. Pero jugará el mundial y si él quiere...") },
	    	{ letter: "j", answer: "jose mari", status: 0, question: ("CON LA J. Delantera española en el Milán. Hizo pareja con Javi Moreno") },
	    	{ letter: "k", answer: "koeman", status: 0, question: ("CON LA K. El gol de Wembley") },
	    	{ letter: "l", answer: "larsson", status: 0, question: ("CON LA L. Dos temporadas en el Fc Barcelona. Heroe de la final del 2006 contra el Arsenal. Pasazo a Eto'o en el primero. Pasazo a Belleti en el segundo.") },
	    	{ letter: "m", answer: "mendieta", status: 0, question: ("CON LA M. Le apodan el murciélago porque es una sutil forma de decir que es igual de importante que el del escudo. El gran capitán. Luego no triunfó de lateral") },
	    	{ letter: "n", answer: "nolito", status: 0, question: ("CON LA N. Parecía el nuevo Villa en el B pero quiso irse: Benfica, Granada, Celta (donde lo petó), Manchester City y Sevilla") },
	    	{ letter: "ñ", answer: "miño", status: 0, question: ("CONTIENE LA Ñ. El calco de Valdés") },
	    	{ letter: "o", answer: "overmars", status: 0, question: ("CON LA O. Se compró con el dinero de Figo para ser el mejor extremo del mundo") },
	    	{ letter: "p", answer: "pizzi", status: 0, question: ("CON LA P. Marcó el 5-4 en un trepidante Fc Barcelona vs Atlético de Madrid") },
	    	{ letter: "q", answer: "quaresma", status: 0, question: ("CON LA Q. Gitano. El nuevo Figo") },
	    	{ letter: "r", answer: "rochemback", status: 0, question: ("CON LA R. Centrocampista brasileño por el que el Fc Barcelona desenvolsó una importante cantidad a Internacional en 2001. Fue mejor jugador de la liga portuguesa en el 2003 jugando cedido en el Sporting de Lisboa. También pasó por el Midlesbrought") },
	    	{ letter: "s", answer: "stoichkov", status: 0, question: ("CON LA S. Dijo Cruyff de él: Necesitamos un cabrón en un equipo de buenas personas") },
	    	{ letter: "t", answer: "tristan", status: 0, question: ("CON LA T. El mago de la Aldava. Delantero figura del Deportivo de la Coruña que fue pichichi en el 2002. Acabó su andadura en el Cádiz después de probar suerte en Italia e Inglaterra") },
	    	{ letter: "u", answer: "umtiti", status: 0, question: ("CON LA U. Después de Blanc, Abidal, Christanval o Thuram otro defensa central francés de garantías (no como digne)") },
	    	{ letter: "v", answer: "valeron", status: 0, question: ("CON LA V. El mago. Empezó y acabó en Las Palmas. Su mejor etapa: Deportivo de la Coruña") },
	    	{ letter: "w", answer: "will grigg", status: 0, question: ("CON LA W. Is on fire. Your defence is terrify") },
	    	{ letter: "x", answer: "xavi", status: 0, question: ("CON LA X. Decía que los dos no podían jugar juntos en el medio campo del mejor Barça de la historia") },
	    	{ letter: "y", answer: "afellay", status: 0, question: ("CONTIENE LA Y. Holandés que no pudo triumfar en el Barça y se fue con Bojan") },
	    	{ letter: "z", answer: "zlatan", status: 0, question: ("CON LA Z. Nombre del delantero de grandísimo nivel al que Bojan acabó sentando en el banquillo") },
	];
	var records=[];
	function namePlayers (){
		var count=0;
		var nameUsers={};
		do{
			var userOrNo = prompt ("¿Quieres introducir un usuario para empezar a jugar?(Si/No)");
			if (userOrNo!==null){
				userOrNo.toLowerCase();
				if (userOrNo==="si"){
					var user=prompt ("Introduce el nombre de tu usuario:");
					if (user!==null){
						var count=count+1;
						records[count-1]={name:user};
					}else{
						if (count>0){
							userOrNo="no";
						}else{
							alert ("Usted ha decidido terminar el juego");
						}
					}
				}else if (userOrNo===""){
					alert ("¡Usted ha realizado una acción incorrecta!");
				}
			}else{
				if (count===0){
					alert ("Ha decidido terminar el juego puesto que no ha introducido ningún usuario");
					break;
				}else{
					alert ("Empezarán el juego los usuarios introducidos anteriormente");
					break;
				}
				
			}
			
		} while (userOrNo!=="no");
	}
	function start(numUser){
		var count=0;
		records[numUser].points=0;
		alert ("Bienvenido "+records[numUser].name+": ¡Pulsa Aceptar cuando estés listo para jugar!");
		while (count<questions.length){
			for (prop in questions){
				if (questions[prop].status===0){
					var answer = prompt (questions[prop].question);
					if (answer!==null){
						answer=answer.toLowerCase();
						if(answer===questions[prop].answer){
							alert ("¡Ha respondido "+answer+" y la respuesta es correcta! Obtienes un punto más");
							questions[prop].status=1;
							records[numUser].points=records[numUser].points+1;
							count=count+1;
						}else if ((answer==="")||(answer==="pasapalabra")){
							alert ("Has dejado la pregunta para la próxima ronda");
						}else{
							alert ("¡La respuesta es incorrecta!");
							questions[prop].status=1;
							count=count+1;
						}	
					}else{
						alert ("Ha dejado el juego con "+records[numUser].points+" aciertos");
						records[numUser].points=0;
						count=questions.length;
						break;
					}
					
				}	
			}
		}
	}
	function reset(){
		for (prop in questions){
			questions[prop].status=0;
		}
	}
	function tableOfRecords(){
		for (prop in records){
			if (records[prop].points>0){
				console.log(records[prop].name+" => "+records[prop].points+" puntos");
			}	
		}
	}
	namePlayers();
	for (var i=0; i<records.length; i++){
		reset();
		start(i);
	}
	tableOfRecords();
}
pasapalabra();


