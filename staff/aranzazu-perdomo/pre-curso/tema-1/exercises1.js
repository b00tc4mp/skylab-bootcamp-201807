a) Declara tu nombre y muéstralo por consola:

var name='Mark';
console.log(name);

b) Declara tu edad y muéstralo por consola:
var age=38;
console.log(age);

c) Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:

var info= ['Mark','Zuckerberg',21];

console.log(info[1]);

d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:

var data ={name: 'Mark', age: 21};
console.log(data);

e) Ahora utiliza el array que has creado anteriormente para recorrerlo y mostrar una a una todas las posiciones del array.
var info= ['Mark','Zuckerberg',21];

console.log(info[0]);
console.log(info[1]);
console.log(info[2]);


f) Crea una estructura condicional que imprima el número mayor entre dos números.
f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:
	var a = 25
    var b = 12
        if (a<b) {
            console.log(b);
        }
        else if (a===b){
            console.log("The numbers are equal");
        }
        else  {
           console.log(a);
        }

g1) Declara tu nombre y tu edad dos variables y crea un condicional para, en caso de no coincidir con tus datos, mostrar un error

	var myName="Aranzazu";
	var myAge=32;
       if(myName==='Aranzazu' && myAge===32){
           	console.log("Hi!! Glad to see u again!");
       }
       else{
           console.log("this is not you!");
       }

 g2) Crea una array, introduce los datos anteriores y unos cuantos más de forma que al recorrer la array, muestre un mensaje cuando encuentre tus datos.
 	var person=["Aranzazu","Perdomo","32","Lanzarote","Las Palmas"];
	for(var i=0; i<person.length; i++){
 	 console.log(person[i]);



TEMA 1
a) Puedes contar cuantas letras tiene tu nombre?

function contarLetras(myName){
  
  console.log("My name has "+myName.length+" letters.");
  
  
}
contarLetras("Aranzazu");



b) Añade tu apellido e indica en que posición se encuentra

function showLetters(name){
   console.log("Your first lastname"+" "+name.substr(5,5)+" "+"on position"+" "+name.indexOf("Stark"));
    }
showLetters("Tony Stark");

c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre

function showLetters(name){
   console.log("My Name is"+" "+name.substr(0,4));
    }
showLetters("Tony Stark");

d) Ahora, solo tu apellido.
function showLetters(name){
   console.log("My lastname is"+" "+name.substr(5,5));
    }
showLetters("Tony Stark");

d1) Iguala el resultado a una variable nueva e imprímela por pantalla.










f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.
function showLetters(name){
   console.log("My lastname is"+" "+name.substr(5,5).toUpperCase());
    }
showLetters("Tony Stark");

g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.

function showLetters(name,something){
   console.log(something);
    }
showLetters("Tony Stark",name.substring(0,4)+" "+"is awesome");

h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?

function showLetters(name,lastname){
   var myFirstLastnameLetters= name.charAt(0)+"."+lastname.charAt(0);

   console.log(myFirstLastnameLetters);
    }
showLetters("Tony", "Stark");


 ARRAY TEMA
 
 a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
 
 var aName = ["ARANZAZU","PERDOMO"];
 var myName = aName.join('').split('').join('/');
 console.log(myName);
 

b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"
 var datos = ["ARANZAZU","PERDOMO"];
 var myName = datos.join('').split('').slice(8).join('|');
 console.log(myName);

 
c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)
var datos = ["ARANZAZU","PERDOMO"];
for(var i=0;i<datos[0].length;i++){
  console.log( i+1 + '=>' + datos[0][i]);
}

d)Como en el ejercicio anterior, pero seleccionando tu apellido

var datos = ["ARANZAZU","PERDOMO"];
for(var i=0;i<datos[1].length;i++){
  console.log( i+9 + 'º'+' '+ datos[1][i]);
}
 



e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

	var datos = ["ARANZAZU","PERDOMO"];
	var myInitials=datos[0].charAt(0)+"."+datos[1].charAt(0);
	console.log(myInitials);

f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.

var datos = ["ARANZAZU","PERDOMO","32"];

var mySelector="My name is"+" "+datos[0]+" "+"and i'm"+" "+datos[2]+" "+"years old";
console.log(mySelector);


g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.


function myCityAdd (datos,nuevoValor){
        datos.push(nuevoValor);
        var lista =datos.join(",");
        console.log("New value added to array! =>"+ lista);
  
  
}
myCityAdd(["Aranzazu","Perdomo","32"],"Arrecife");



h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

function myCityDelete(datos,nuevoValor){
        datos.push(nuevoValor);
        datos.pop(nuevoValor);
  
        var separador =datos.join(",");
        console.log("City deleted! =>"+ separador);
  
  
}
myCityDelete(["Aranzazu","Perdomo","32"],"Arrecife");

j) Ahora, elimina el nombre y asegura los cambios Resources

function deleteFirstValue(datos,nuevoValor){
        var eliminar=datos.shift();
  
        var separador =datos.join(", ");
        console.log("First value deleted from array! =>"+ separador);
  
  
}
deleteFirstValue(["Aranzazu","Perdomo","32"]);

k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición? 
function addElementonFirstPosition(datos,nuevoValor){
        var add=datos.unshift(nuevoValor);
  
        var separador =datos.join(", ");
        console.log("Add Element on First Position! =>"+ separador);
  
  
}
addElementonFirstPosition(["Perdomo","32"],"Aranzazu");


l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.

function multiplicar (number){
        var myltbyTwo=number.map((number)=> number*2);
        
         console.log( "El resultado es"+" "+ myltbyTwo);
        
        
}
multiplicar([0,1,2,3,4,5,6,7,8,9,10]);





 l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.

function multiplicar (array_datos,multi){
        var array_mult=array_datos.map((array_datos)=>array_datos*multi);
        console.log("El resultado es "+" "+array_mult);
        
}
multiplicar([0,1,2,3,4,5,6,7,8,9,10],3);


m) Podrías mostrarlos en el orden inverso?
function inverso (datos){
        var alreves=datos.sort((function(a, b){return b-a}));
        console.log("Los números están de mayor a menor"+" "+alreves);
        
}
inverso([0,1,2,3,4,5,6,7,8,9,10]);




TEMA NUMEROS

 a) Que hora es? Declara la hora como número y devuelvela como String

function dimeLaHora(number){
  var hora=number.toString();
  console.log("I'ts",hora,"of morning");
}
dimeLaHora(10.45);

b) Nono, que hora exactamente? Dime la hora sin minutos
function dimeLaHora(number){
  var redondeo=number.toFixed(0);
  console.log("I'ts around",redondeo,"of morning");
}
dimeLaHora(10.45);

c) Ahora, declara tu hora y muéstrala redondeada.

function redondeo(number){
  var num=Math.round(number);
  console.log(num,"!");
}
redondeo(21.26);

d) Hagamos una calculadora. Primero, la suma.

function calculadora(num1,num2){
      var suma=num1+num2;
      console.log("The sum of 7+3 is",suma);
  
}
calculadora(7,3);

d1) Añade la resta...

function calculadora(num1,num2){
      var suma=num1+num2;
      var resta=num1-num2;
      console.log("The sum and rest of 7 and 3 is",suma,"and",resta);
  
}
calculadora(7,3);

d2) Y la multiplicación
d3) Por ultimo, la división

function calculadora(num1,num2){
      var suma=num1+num2;
      var rest=num1-num2;
      var mult=num1*num2;
      var div=(num1/num2).toFixed(1);
      console.log(suma+', '+rest+', '+mult+" and "+div);
  
}
calculadora(7,3);


d4) Ahora, intenta multiplicar un número por una string, que devuelve?

function controlError(num1,num2){
      if(num1||num2){
        console.log("You can't do this operation!");
      }
  
}
controlError(7,"Aranzazu");







function calculadora(num1,num2){
      console.log(num1*num2);
  
}
calculadora(7,"Aranzazu");

e) Podemos controlar este error con un condicional if?













































