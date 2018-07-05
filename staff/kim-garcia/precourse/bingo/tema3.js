//Exercises:
//a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.

function saludo(name){
    console.log("Hello " + name)
}
saludo("KIM")


//b) Intenta retornar los valores en lugar de usar console.log
function saludo2(myName){
    return "Hello " + myName + ", como vamos?"
}
saludo2("KIM")


//c) Ahora, añade tu edad y concaténala al return
//return 'myMessage' //output: 'hello myName, you're myAge years old.'
//Cual es la diferencia entre console.log() & return?
//ead this => http://stackoverflow.com/questions/21020608/difference-between-console-log-and-return-in-javascript

function saludo2(myName, myAge){
    return "Hello " + myName + " tienes " + myAge + " años."
}
saludo2("KIM", 26)


//d) Iguala tu función a una variable y ejecútala
//var MyFunction = ... //output: 'hello myName, you're myAge years old.'
//myFunction()
//=> Podemos guardar resultados de funciones en una variable, es decir, sus returns

function saludo2(myName, myAge){
    return "Hello " + myName + " tienes " + myAge + " años."
}
saludo2("KIM", 26)

var myFunction = saludo2("Kim", 26)
console.log(myFunction)



//e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable,
// intenta imprimir sus dos resultados concatenados Now, try to declare other function and 
//assign it result to other variable called myAge, and try to print the result of both functions in one line.
//myName() + myAge() //output: IronMan 40

function name(nom){
    return nom
}


function age(edad){
    return edad
}
var algo = age(26) + " " + name("Kim")

//e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y 
//conviertelo todo a un solo string.
myName() + (myAge() + myRandomNumber).toString()//output: IronMan 45

function name(nom){
    return nom
}


function age(edad){
    return edad
}
var algo = age(26) + Math.random()*10 + " " + name("Kim") 



//f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.

var...
var...
myName(param1) + myAge(param2) //output: IronMan 43

function name(nom){
    return nom
}
var varNom = name("Kim")

function age(edad){
    return edad
}
var varAge = age(26)

var algo = age(varNom) + " " + name(varAge) 
console.log(algo)




//g) Intenta englobar todas las funciones en una sola funcion padre,
// el return de dicha función padre deberá ser la llamada a las funciones hijas

function ... (){
    var x = myName(param1)
    var y = myAge(param2)
    return x + y
} //output: IronMan 40


function name(nom){
    return nom
}
var varNom = name("Kim")

function age(edad){
    return edad
}
var varAge = age(26)


function padre(){

    return age(randomNum()) + name("KIM")

}
padre()




//h) Haz otra función hija que solo devuelva un número random, 
//ese número random será el argumento que se pasará como parámetro a la función age()
return x + y // output: IronMan 6457689
http://www.w3schools.com/jsref/jsref_random.asp

function randomNum(){
    return Math.random()
}
function name(nom){
    return nom
}
var varNom = name("Kim")

function age(edad){
    return edad
}
var varAge = age(26)


function padre(){

    console.log(age(randomNum()) + " " + name("KIM"))

}
padre()



//i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50
return x + y // output: IronMan 3...Sure you're Tony Stark?

var num = randomNum()
function randomNum(){
    return Math.floor(Math.random()*50)
}

function name(nom){
    return nom
}

function age(edad){
    return edad
}


function padre(){
    if (age(num) < 20){
        var newAge = "Jovensuelo"
    } else if(age(num) >= 20 && age(num)<50) {
        var newAge = "Viejuno"
    }
    console.log(newAge + " con edad de " + age(num) + " años llamado " + name("KIM"))

}
padre()


//j) Al return de la función name(), concaténale otro mensaje
return x + y // output: Tony Stark...aka IRONMAN, 34...Sure you're Tony Stark? 


//k) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable
//return x + y // output: The first function returns: 'Tony Stark...aka IRONMAN', The second function returns:
// '34...Sure you're Tony Stark?' 


//l) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, 
//no siga con la segunda llamada
//return x + y // output: "The first function returns: Hulk... You're not IRONMAN!"

var num = randomNum()
function randomNum(){
    return Math.floor(Math.random()*50)
}

function name(nom){
    return nom
}

function age(edad){
    return edad
}


function padre(nombre){
    if (name(nombre) != "KIM"){
        console.log("YOU ARE NOT SUPER KIM")
    }else {
         if (age(num) < 20){
        var newAge = "Jovensuelo"
        } else if(age(num) >= 20 && age(num)<50) {
        var newAge = "Viejuno"
        }
    console.log(newAge + " con edad de " + age(num) + " años llamado " + name(nombre))
    }
}
padre("KIM")



//m) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre.
// Retorna a la funcion padre y concaténalo en el return padre.

function GenerateRandom(){
    ...
    return randomNumber.
}

function father(){
    var numR = GenerateRandom()
    return ...numR()...
}
///////

var num = randomNum()
function randomNum(){
    return Math.floor(Math.random()*50)
}

function name(nom){
    return nom
}

function age(edad){
    return edad
}


function padre(nombre){
    if (name(nombre) != "KIM"){
        console.log("YOU ARE NOT SUPER KIM")
    }else {
         if (age(num) < 20){
        var newAge = "Jovensuelo"
        } else if(age(num) >= 20 && age(num)<50) {
        var newAge = "Viejuno"
        }
    console.log(newAge + " con edad de " + age(num) + " años llamado " + name(nombre))
    }
}
padre("KIM")



//n) Refactorizemos nuestro código dejando todas las funciones separadas del padre, 
//éste último se encargará de llamarlas todas y mostrar sus resultados.

function name(nombre){
    if (nombre != "KIM"){
        console.log("YOU ARE NOT SUPER KIM")
    }else {
        console.log(nombre)
    }
}


function randomNum(){
    var num = Math.floor(Math.random()*50)
    console.log(num)
}

function age(edad){
    console.log(edad)

}


function padre(nombre, edad){
    age(edad)
    name(nombre)
    randomNum()

}
padre("KIM", 26)


//ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre,
// muestra los resultados de esta array como siempre.

function name(nombre){
    if (nombre != "KIM"){
        console.log("YOU ARE NOT SUPER KIM")
    }else {
        return nombre
    }
}


function randomNum(){
    var num = Math.floor(Math.random()*50)
    return num
}

function age(edad){
    return edad

}


function padre(nombre, edad){
    arr = []
    arr.push(age(edad))
    arr.push(name(nombre))
    arr.push(randomNum())
    console.log(arr)


}
padre("KIM", 26) ///IMPORTANTE PONER RETURN DENTRO DE LAS FUNCIONES HIJASS///////

//o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, 
//deberá hacer otro push "hello from the dark side..." a la array que crea father(). Muestra toda la array completa.

function name(nombre){
    if (nombre != "KIM"){
        console.log("YOU ARE NOT SUPER KIM")
    }else {
        return nombre
    }
}

function randomNum(){
    var num = Math.floor(Math.random()*50)
    return num
}

function age(edad){
    return edad

}


function padre(nombre, edad){
    arr = []
    arr.push(age(edad))
    arr.push(name(nombre))
    arr.push(randomNum())
}
 

function dark(){
    padre("KIM", 26)
    arr.push("Hello from the dark side ")
    console.log(arr)
}
dark()
 // SE USA ARR DENTRO D OTRA FUNCION


//p) 🔞 👊🏼 Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y 
//compara sus randomNums, mostrando un mensaje indicando cual es mayor. 
//El nombre pasado por parámetro también deberá ser random entre una array de nombres,
//con lo cual, también deberás refactorizar las funciones hijas.


function name(nombre){
    if (nombre != "KIM"){
        console.log("YOU ARE NOT SUPER KIM")
    }else {
        return nombre
    }
}

function randomNum(){
    var num = Math.floor(Math.random()*50)
    return num
}

function age(edad){
    return edad
}

function padre(nombre, edad){
    arr = []
    arr.push(age(edad))
    arr.push(name(nombre))
    arr.push(randomNum())
}

function dark(nombre, edad){
    padre(nombre, edad)
    arr.push("Hello from the dark side ")
    return arr
    
}


 function randomName(){
    var arrNames = ["Pepito", "Pepita", "Menganito", "Menganita", "Taradito"]
    var randNum = Math.floor(Math.random()*4)
    return arrNames[randNum]
 }

var nombrete = randomName()

function result(){

var array1 = dark(nombrete, 26)
var array2 = dark(nombrete, 35)


    if (array1[2] < array2[2]){
    console.log('EL numero ' + array1[2] + ' es mas pequeño que ' + array2[2])
    } else {
    console.log('EL numero ' + array1[2] + ' es mas grande que ' + array2[2])
    }
}
result()






/////
function grandFather(){
    var names = ['hulk', 'ironMan', '...']
    var selectedName...
    var selectedName2...
    if(father(selectedName) > father(selectedName2))
        ...
    else
        ...
    return father(selectedName).push().join()...
}
//////////



//p1) En lugar de retornar los valores como una array, prepara tus funciones
// para que devuelvan los resultados como OBJECTS. Muestra por pantalla los objetos sin estilizar el output.





//p2) Muestra los resultados de los OBJECTS recorriendolos y mostrando los valores de una forma amigable.


