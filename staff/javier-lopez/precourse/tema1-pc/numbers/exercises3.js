//c) Ahora, declara tu hora y muéstrala redondeada.
function WichTimeIsIt(){
	var date = new Date();
	var RoundTime = date.getHours()+Math.round(date.getMinutes()/60);

	console.log(RoundTime+"!!");
	
}

WichTimeIsIt();