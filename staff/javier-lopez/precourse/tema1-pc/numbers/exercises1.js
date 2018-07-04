//a) Que hora es? Declara la hora como número y devuelvela como String

function WichTimeIsIt(){
	var Dates = new Date();
	var Hour = Dates.getHours().toString();
	var Minutes = Dates.getMinutes().toString();
	var ActualTime = Hour+"."+Minutes;
	if(Hour<12 && Hour>6){
	console.log("It's "+ActualTime+" of Morning");
    }
	if(Hour>11 && Hour<21){
    console.log("It's "+ActualTime+" of Afternoon");
	}
	if(Hour>20 && Hour<=23){
    console.log("It's "+ActualTime+" of Night");
	}
	if(Hour>=0 && Hour<7){
    console.log("It's "+ActualTime+" of Early Night");
	}
	
	
}

WichTimeIsIt();