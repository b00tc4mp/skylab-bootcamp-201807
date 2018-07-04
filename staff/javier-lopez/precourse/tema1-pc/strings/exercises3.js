//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre.

//Preguntar como hacerlo automatico
function ShowName(name){
	console.log("My name is "+name.substr(0,name.indexOf(" ")));
}

ShowName("Javier Lopez Blasco");