//Strings
//a) Puedes contar cuantas letras tiene tu nombre?
function showLetters(name) {
 	console.log ("My name has "+ name.length + " letters");
}
showLetters ("Maider");

//b) Añade tu apellido e indica en que posición se encuentra
var nameSurname = ["Maider", "Hernandorena"];
console.log ("My first last name starts on position " + nameSurname.indexOf("Hernandorena") );

//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre.
console.log ("My name is " + nameSurname[0]);

//d) Ahora, solo tu apellido.
console.log ("My lastname is " + nameSurname[1]);

//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.
name = nameSurname[1];
console.log (nameSurname.join (" ")  +", " +  name);

//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.
abbreviation = nameSurname[1].replace("Hernandorena","Mrs");
console.log ("Hello, " + abbreviation + " " + nameSurname[1]);

//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.
console.log ("My lastname is " + nameSurname[1].toUpperCase());

//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.
var something = nameSurname[0] + " is awesome";
console.log (something);

//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?
console.log (nameSurname[0].substring (0,1) + "." + nameSurname[1].substring (0,1));
