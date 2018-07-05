//b) Nono, que hora exactamente? Dime la hora sin minutos
function actualHour(){
	var dates = new Date();
	var hour = Dates.getHours().toString();
	if(hour<12 && hour>6){
	console.log("It's "+hour+" of Morning");
    }
	if(hour>11 && hour<21){
    console.log("It's "+hour+" of Afternoon");
	}
	if(hour>20 && hour<=23){
    console.log("It's "+hour+" of Night");
	}
	if(hour>=0 && hour<7){
    console.log("It's "+hour+" of Early Night");
	}
	
	
}

actualHour();