//c) Ahora, declara tu hora y muéstrala redondeada.
function wichTimeIsIt(){
	var date = new Date();
	var roundTime = date.getHours()+Math.round(date.getMinutes()/60);

	console.log(roundTime+"!!");
	
}

wichTimeIsIt();