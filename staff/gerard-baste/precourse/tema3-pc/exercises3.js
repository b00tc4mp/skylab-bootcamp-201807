Exercises:

// Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.

function myFirstName (myName){
    console.log('Hello ' + myName)
}

myFirstName('Gerard')

//Intenta retornar los valores en lugar de usar console.log

function myFirstName (myName){
    return 'Hello ' + myName
}

myFirstName('Gerard')


// Ahora, añade tu edad y concaténala al return

function myFirstName (myName,myAge){
    return 'Hello ' + myName + " you're " + myAge + ' years old '
}

myFirstName('Gerard',32)

Cual es la diferencia entre console.log() & return?

    Read this => http://stackoverflow.com/questions/21020608/difference-between-console-log-and-return-in-javascript

//Iguala tu función a una variable y ejecútala

function myFirstName (myName,myAge){
    return 'Hello ' + myName + " you're " + myAge + ' years old '
}

var myFunction = myFirstName('Gerard',32)

console.log(myFunction)

=> Podemos guardar resultados de funciones en una variable, es decir, sus returns

// Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable, intenta imprimir sus dos resultados concatenados Now, try to declare other function and assign it result to other variable called myAge, and try to print the result of both functions in one line.

function myFirstName (myName){
    return  myName 
}

function myAge(age){
return age

}

var myName = myFirstName('Gerard')
var theAge = myAge(32) 

console.log(myName + ' ' + theAge)



// Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.

function myFirstName (myName){
    return  myName 
}

function myAge(age){
    return age
}

var myName = myFirstName('Gerard')
var theAge = myAge(32) 

console.log(myName + ' ' + (theAge + Math.floor((Math.random() * 10))).toString())



//Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.

var myName = 'Gerard';
var age = 32;

function myFirstName(myName){
    return  myName;
}

function myAge(age){
return age;

}

console.log(myFirstName(myName) + ' ' + myAge(age))

// Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada a las funciones hijas

function info(){

var myName = 'Gerard';
var age = 32;

    function myFirstName(myName){
        return  myName;
    }

    function myAge(age){
        return age;
    }

return myFirstName(myName) + ' ' + myAge(age)

}

info()

// OTRA OPCION

    function myFirstName(myName){
        return  myName;
    }

    function myAge(age){
        return age;
    }


function fatherFunction(myName,age){

    var myName = myFirstName(myName);
    var age = myAge(age)

    return myName + ' ' + age

}

console.log(fatherFunction('Gerard',32))


/*
function ... (){
    var x = myName(param1)
    var y = myAge(param2)
    return x + y
} //output: IronMan 40
*/

// Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se pasará como parámetro a la función age()


function info(){

var myName = 'Gerard';
var age = randomNumber()

    function myFirstName(myName){
        return  myName;
    }

    function myAge(age){
        return age;
    }

    function randomNumber(){
        return Math.floor((Math.random() * 100))
    }

return myFirstName(myName) + ' ' + myAge(age)

}

info()

// OTRA OPCION

    function myFirstName(myName){
        return  myName;
    }

    function myAge(age){
        return age;
    }

    function randomNumber(){
        return Math.floor((Math.random() * 100))
    }

function fatherFunction(myName,age){

    var myName = myFirstName(myName);
    var randomNum = randomNumber()
    var age = myAge(randomNum)

    return myName + ' ' + age

}

console.log(fatherFunction('Gerard'))

/*
return x + y // output: IronMan 6457689

http://www.w3schools.com/jsref/jsref_random.asp
*/


//Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50

function info(){

var myName = 'Gerard';
var age = randomNumber()

        function myFirstName(myName){
            return  myName;
        }

        function myAge(age){
            return age;
        }

        function randomNumber(){
            return Math.floor((Math.random() * 50))
        }

    if(age<= 21){
        return myFirstName(myName) + ' tienes ' + myAge(age) + ' años, eres muy joven'
    }else{


        return myFirstName(myName) + ' tienes ' + myAge(age) + ' años, eres un viejales'
    }
}

info()

//OTRA OPCION

function myFirstName(myName){
    return  myName;
}

function myAge(age){
    return age;
}

function randomNumber(){
    return Math.floor((Math.random() * 50))
}

function fatherFunction(myName,age){

    var myName = myFirstName(myName);
    var randomNum = randomNumber()
    var age = myAge(randomNum)

    if(age<= 21){
        return myName + ' tienes ' + age + ' años, eres muy joven'
    }else{

        return myName + ' tienes ' + age + ' años, eres un viejales'
    }


}

console.log(fatherFunction('Gerard'))

/*
return x + y // output: IronMan 3...Sure you're Tony Stark?
*/

//Al return de la función name(), concaténale otro mensaje

function info(){

var myName = 'Gerard';
var age = randomNumber()

        function myFirstName(myName){
            return  myName + ' el menja tallarines';
        }

        function myAge(age){
            return age;
        }

        function randomNumber(){
            return Math.floor((Math.random() * 50))
        }

    if(age<= 21){
        return myFirstName(myName) + ' tienes ' + myAge(age) + ' años, eres muy joven'
    }else{


        return myFirstName(myName) + ' tienes ' + myAge(age) + ' años, eres un viejales'
    }
}

info()

//OTRA OPCION

  function myFirstName(myName){
        return  myName + ' el menja tallarines';
    }

    function myAge(age){
        return age;
    }

    function randomNumber(){
        return Math.floor((Math.random() * 50))
    }

function fatherFunction(myName,age){

    var myName = myFirstName(myName);
    var randomNum = randomNumber()
    var age = myAge(randomNum)

    if(age<= 21){
        return myName + ' tienes ' + age + ' años, eres muy joven'
    }else{

        return myName + ' tienes ' + age + ' años, eres un viejales'
    }


}

console.log(fatherFunction('Gerard'))

/*

return x + y // output: Tony Stark...aka IRONMAN, 34...Sure you're Tony Stark? 
*/
//Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable


function info(){

var myName = 'Gerard';
var age = 32


        function myFirstName(myName){
            return  myName + ' el menja tallarines';
        }

        function myAge(age){
            return age;
        }

        function randomNumber(){
            return Math.floor((Math.random() * 50))
        }

return 'La primera funcion devuelve el nombre ==> ' + myFirstName(myName) + ', la segunda funcion devuelve la edad ==> ' + myAge(age) + ', la tercera funcion devuelve un numero aleatorio del 0 al 50 ==> ' + randomNumber()

}

info()

//OTRA OPCION

  function myFirstName(myName){
        return  myName;
    }

    function myAge(age){
        return age;
    }

    function randomNumber(){
        return Math.floor((Math.random() * 50))
    }

function fatherFunction(myName,age){

    var myName = myFirstName(myName);
    var randomNum = randomNumber()
    var age = myAge(randomNum)


return 'La primera funcion devuelve el nombre ==> ' + myName + ', la segunda funcion devuelve la edad ==> ' + age + ', la tercera funcion devuelve un numero aleatorio del 0 al 50 ==> ' + randomNum

}

console.log(fatherFunction('Gerard',32))


/*
return x + y // output: The first function returns: 'Tony Stark...aka IRONMAN', The second function returns: '34...Sure you're Tony Stark?' 
*/


//Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, no siga con la segunda llamada

  function myFirstName(myName){
            return myName
    }
    function myAge(age){
        return age;
    }

    function randomNumber(){
        return Math.floor((Math.random() * 50))
    }


function fatherFunction(myName,age){

    var myName = myFirstName(myName);
    var randomNum = randomNumber()
    var age = myAge(age)

    if (myName !== 'Gerard'){
        return 'Eh!! Tu no eres Gerard'
    }
        return 'Hola ' + myName + ', tienes ' + age + ' años '
}
console.log(fatherFunction('Gerard',32))

/*
return x + y // output: "The first function returns: Hulk... You're not IRONMAN!"
*/

//Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. Retorna a la funcion padre y concaténalo en el return padre.

function GenerateRandom(){
    ...
    return randomNumber.
}

function father(){
    var numR = GenerateRandom()
    return ...numR()...
}

// Refactorizemos nuestro código dejando todas las funciones separadas del padre, éste último se encargará de llamarlas todas y mostrar sus resultados.

function father(){
    myFunction();
    myOtherFunction();
    myOtherVarFunction();
    return...
}

ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, muestra los resultados de esta array como siempre.




o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, deberá hacer otro push "hello from the dark side..." a la array que crea father(). Muestra toda la array completa.

p) 🔞 👊🏼 Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y compara sus randomNums, mostrando un mensaje indicando cual es mayor. El nombre pasado por parámetro también deberá ser random entre una array de nombres, con lo cual, también deberás refactorizar las funciones hijas.

function gandFather(){
    var names = ['hulk', 'ironMan', '...']
    var selectedName...
    var selectedName2...
    if(father(selectedName) > father(selectedName2))
        ...
    else
        ...
    return father(selectedName).push().join()...
}

p1) En lugar de retornar los valores como una array, prepara tus funciones para que devuelvan los resultados como OBJECTS. Muestra por pantalla los objetos sin estilizar el output.

p2) Muestra los resultados de los OBJECTS recorriendolos y mostrando los valores de una forma amigable.




/*Revisar Ternarios elem > 5 ? console.log(pepe) : ''

if (elem > 5){
    console.log()pepe


} else{
    
''

}

Revisar .filter

                    