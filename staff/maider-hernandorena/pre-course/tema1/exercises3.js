//Numbers
//a) Que hora es? Declara la hora como número y devuelvela como String
var hour = 8.24;
var stringHour = hour.toString();
console.log("I'ts " + stringHour + " in the afternoon");

//b) Nono, que hora exactamente? Dime la hora sin minutos
console.log("It's around "+ stringHour[0] +" in the afternoon");

//c) Ahora, declara tu hora y muéstrala redondeada.  
function myFunction() {
    var hourRound = Math.round(hour);
    console.log(hourRound);
}
myFunction();

//d) Hagamos una calculadora. Primero, la suma.
var sum = 7+3;
console.log(sum);

//d1) Añade la resta...
var rest = 7-3;
console.log(rest);

//d2)  Y la multiplicación
var mult = 7*3;
console.log(mult);

//d3) Por ultimo, la división
var div = 7/3;
console.log(div);

//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
console.log(10*stringHour);

//e) Podemos controlar este error con un condicional if?
