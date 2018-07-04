//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.



function UpperCase(Lastname){
	var mySelection=Lastname.charAt(0).toUpperCase()+Lastname.slice(1);
	return mySelection;
}

var something = UpperCase("lopez") + " is awesome";
console.log(something);