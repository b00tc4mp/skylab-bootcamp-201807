//b) Nono, que hora exactamente? Dime la hora sin minutos
function ActualHour(){
	var Dates = new Date();
	var Hour = Dates.getHours().toString();
	if(Hour<12 && Hour>6){
	console.log("It's "+Hour+" of Morning");
    }
	if(Hour>11 && Hour<21){
    console.log("It's "+Hour+" of Afternoon");
	}
	if(Hour>20 && Hour<=23){
    console.log("It's "+Hour+" of Night");
	}
	if(Hour>=0 && Hour<7){
    console.log("It's "+Hour+" of Early Night");
	}
	
	
}

ActualHour();