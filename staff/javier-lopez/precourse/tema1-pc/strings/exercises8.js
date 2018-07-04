//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.



function upperCase(lastname){
	var mySelection=lastname.charAt(0).toUpperCase()+lastname.slice(1);
	return mySelection;
}

var something = upperCase("lopez") + " is awesome";
console.log(something);