a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.
function saludo(myName){
  
  console.log("Hola "+myName);
}
saludo("Jhon");


b) Intenta retornar los valores en lugar de usar console.log
function saludo(myName){
  
  return "Hola "+ myName;
}
saludo("Jhon");

c) Ahora, añade tu edad y concaténala al return

function saludo(myName,myAge){
  
 return "hello " + myName+ ", you're "+myAge+ " years old.";
 
}
console.log (saludo("Jhon",47));

d) Iguala tu función a una variable y ejecútala

function saludo(myName,myAge){
  
 return "hello " + myName+ ", you're "+myAge+ " years old.";
 
}
var MyFunction=saludo("Jhon",47);
console.log(MyFunction);

e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable, intenta imprimir sus dos resultados concatenados Now, try to declare other function and assign it result to other variable called myAge, and try to print the result of both functions in one line.

function myName(name){
  
  return name;
}

function myAge (age){
  
  return age;
}

console.log(myName("IronMan ")+myAge(40));



e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.


function myName(name){
  
  return name;
}

function myAge (age){
  
  return age;
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}

console.log(myName("IronMan ")+( myAge(40) + myRandomNumber(0,10) ).toString());

f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.


var name="IronMan ";
var age=40;

function myName(name){
  return name;
}

function myAge(age){
  return age;
}

console.log(myName(name)+myAge(age));


g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada a las funciones hijas


function Saludo(){
  
  var x=myName("IronMan ");
  var y=myAge(40);
  return x+y
  
  
}
console.log(Saludo());

h) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se pasará como parámetro a la función age()


function myName(name){
  
  return name;
}

function myAge (age){
  
  return age;
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}

function Saludo(name){
  
   var x=myName(name);
   var y=myAge(myRandomNumber(1,999));
    return x+y
}
console.log(Saludo("Iroman "));


i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50

function myName(name){
  
  return name;
}

function myAge (age){
  
  return age;
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}

function Saludo(name){
  
   var x=myName(name);
   var y=myAge(myRandomNumber(0,50));
   var z=""
   if(y<20){
       z=" Eres muy joven!!"
        }
  else{
    z=" Tu edad es correcta!!"
  }
    return x+y+z
}
console.log(Saludo("Iroman "));

j) Al return de la función name(), concaténale otro mensaje

function myName(name){
  
  return name+"Avenger:IronMan!! ";
}

function myAge (age){
  
  return age;
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}

function Saludo(name){
  
   var x=myName(name);
   var y=myAge(myRandomNumber(1,50));
   var z=""
   if(y<20){
       z=" Eres muy joven!!"
        }
  else{
    z=" Tu edad es correcta!!"
  }
    return x+y+z
}
console.log(Saludo("Tony Stark "));

k) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable.

function myName(name){
  
  return name+"Avenger:IronMan!! ";
}

function myAge (age){
  
  return age+" Sure you're Tony Stark?";
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}

function Saludo(name){
  
   var x=myName(name);
   var y=myAge(myRandomNumber(1,50));
   var z=""
   if(y<20){
        z=" Eres muy joven!!"
        }
  else{
    	z=" Tu edad es correcta!!"
  }
    return "The first function returns:"+x+"The second function returns: "+y+z;
}
console.log(Saludo("Tony Stark "));

l) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, no siga con la segunda llamada.


function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}

function Saludo(name){
  
   var x=myName(name);
   var y=myAge(myRandomNumber(1,50));
   var z=""
   if(y<20){
       z=" Eres muy joven!!"
        }
  else{
    z=" Tu edad es correcta!!"
  }
    return "The first function returns:"+x+" The second function returns: "+y+z;
}
console.log(Saludo("Hulk "));

n) Refactorizemos nuestro código dejando todas las funciones separadas del padre, éste último se encargará de llamarlas todas y mostrar sus resultados.


function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}


function father(name){
  
    return "The first function returns:"+myName(name)+" The second function returns: "+myAge(myRandomNumber(1,50));
}
console.log(father("Tony Stark "));

ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, muestra los resultados de esta array como siempre.

function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}


function father(name){
  
    var array_resultados=[];
    array_resultados.push(myName(name),myAge(myRandomNumber(1,50)));
    
  
    return "The first function returns:"+array_resultados[0]+" The second function returns: "+array_resultados[1];
}
console.log(father("Tony Stark "));

o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, deberá hacer otro push "hello from the dark side..." a la array que crea father(). Muestra toda la array completa.

function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}


function father(name){
  
    var array_resultados=[];
    array_resultados.push(myName(name),myAge(myRandomNumber(1,50)));
    return array_resultados;
}

function bigFather(name){
    var resultados=father(name);
    resultados.push("Hello from the dark side..." );
    
    return "The first function returns:"+resultados[0]+" The second function returns: "+resultados[1]+"."+resultados[2];
}
console.log(bigFather("Tony Stark "));

p) 🔞 👊🏼 Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y compara sus randomNums, mostrando un mensaje indicando cual es mayor. El nombre pasado por parámetro también deberá ser random entre una array de nombres, con lo cual, también deberás refactorizar las funciones hijas.


function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}


function father(name){
  
    var array_resultados=[];
    array_resultados.push(myName(name),myAge(myRandomNumber(1,50)));
    return array_resultados;
}

function bigFather(){
    var names=["Hulk ","Tony Stark ","Capitán América ","Spiderman "];
    var selectedName=father(names[myRandomNumber(0,names.length-1)]);
    var selectedName2=father(names[myRandomNumber(0,names.length-1)]);
    console.log(selectedName,selectedName2);
    if(selectedName[1]>selectedName2[1]){
      console.log(selectedName[0] + " es mayor que " + selectedName2[0]);
    }
    else if(selectedName[1] < selectedName2[1]){
		console.log(selectedName2[0] + " es mayor que " + selectedName[0]);
	}else{
		console.log(selectedName[0] + " tiene misma edad que " + selectedName2[0]);
}
}
  console.log(bigFather());
  
  p1) En lugar de retornar los valores como una array, prepara tus funciones para que devuelvan los resultados como OBJECTS. Muestra por pantalla los objetos sin estilizar el output.

function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}


function father(name){
  
    var objetoArray={
        _name_:myName(name),
        _age_:myAge(myRandomNumber(1,50)),
            
    };
    return objetoArray;
}

function bigFather(){
    var names=["Hulk ","Tony Stark ","Capitán América ","Spiderman "];
    var selectedName=father(names[myRandomNumber(0,names.length-1)]);
    var selectedName2=father(names[myRandomNumber(0,names.length-1)]);
    console.log(selectedName,selectedName2);
    if(selectedName[1]>selectedName2[1]){
      console.log(selectedName[0] + " es mayor que " + selectedName2[0]);
    }
    else if(selectedName[1] < selectedName2[1]){
		console.log(selectedName2[0] + " es mayor que " + selectedName[0]);
	}else{
		console.log(selectedName[0] + " tiene misma edad que " + selectedName2[0]);
}
}
  console.log(bigFather());


p2) Muestra los resultados de los OBJECTS recorriendolos y mostrando los valores de una forma amigable.
function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}


function father(name){
  
    var objetoArray={
        _name_:myName(name),
        _age_:myAge(myRandomNumber(1,50)),
            
    };
    return objetoArray;
}

function showObject(myObject){
  console.log("\n");
  for(let prop in myObject){
    
     console.log(prop+" "+myObject[prop]);
  }
  
}

function bigFather(){
    var names=["Hulk ","Tony Stark ","Capitán América ","Spiderman "];
    var selectedName=father(names[myRandomNumber(0,names.length-1)]);
    var selectedName2=father(names[myRandomNumber(0,names.length-1)]);
    showObject(selectedName);
    showObject(selectedName2);
  
  
    if(selectedName._age_>selectedName2._age_){
      console.log(selectedName._name_ + " es mayor que " + selectedName2._name_);
    }
    else if(selectedName._age_ < selectedName2._age_){
		console.log(selectedName2._name_ + " es mayor que " + selectedName._name_);
	}else{
		console.log(selectedName._name_  + " tiene misma edad que " + selectedName2._name_ );
}
}
  console.log(bigFather());




























































