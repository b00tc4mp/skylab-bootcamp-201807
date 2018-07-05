//a) Que hora es? Declara la hora como número y devuelvela como String

function wichTimeIsIt(){
	var dates = new Date();
	var hour = dates.getHours().toString();
	var minutes = dates.getMinutes().toString();
	var actualTime = hour+"."+minutes;
	if(hour<12 && hour>6){
	console.log("It's "+actualTime+" of Morning");
    }
	if(hour>11 && hour<21){
    console.log("It's "+actualTime+" of Afternoon");
	}
	if(hour>20 && hour<=23){
    console.log("It's "+actualTime+" of Night");
	}
	if(hour>=0 && hour<7){
    console.log("It's "+actualTime+" of Early Night");
	}
	
	
}

wichTimeIsIt();