a) Primero, creamos una función que nos cree un saludo, 
pasa tu nombre como parámetro y devuélvelo por la consola.

//function (myName){
//    console.log('hello + myName')//output: 'hello myName'
//}

function hola (myName){
    console.log("Hello " + myName);
};
hola("Pau");


b) Intenta retornar los valores en lugar de usar console.log
//
//function (myName){
//    return 'hello + myName' // output: 'hello myName'
//}

function hola(myName){
    return "hello " + myName;
};

hola("Pau");


c) Ahora, añade tu edad y concaténala al return
//
//return 'myMessage' //output: 'hello myName, you're myAge years old.'
Cual es la diferencia entre console.log() & return?
console.log nos imprime el resultado en la console, mientras que return nos devuelve el valor (y también lo imprime en la consola)
//Read this => http://stackoverflow.com/questions/21020608/difference-between-console-log-and-return-in-javascript

function hola(myName,myAge){
    return "Hello " + myName + " you're " + myAge + " years old.";
};

hola("Pau",37); 

d) Iguala tu función a una variable y ejecútala
//
//var MyFunction = ... //output: 'hello myName, you're myAge years old.'
//myFunction()
//=> Podemos guardar resultados de funciones en una variable, es decir, sus returns

var holafunction = function (myName,myAge){
    return "Hello " + myName + " you're " + myAge + " years old.";
};

holafunction("Pau", 37);





e) Ahora declara otra funcion que devuelva tu edad 
y asigna su resultado a otra variable, 
intenta imprimir sus dos resultados concatenados 
//Now, try to declare other function and assign it result to other variable called myAge, 
//and try to print the result of both functions in one line.

//myName() + myAge() //output: IronMan 40

var myAge = function (){
    age = 40;
    return age;
}
var myName= function (){
    name = "Ironman";
    return name;
}

myName () + " " + myAge ()





e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.

//myName() + (myAge() + myRandomNumber).toString()//output: IronMan 45

var myAge = function (){
    age = 40;
    return age;
}
var myName= function (){
    name = "Ironman";
    return name;
}
var myRandomNumber = function(){
    return Math.floor(Math.random() * 11);
}

myName () + " " +  (myAge() + myRandomNumber()).toString()


f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.

//var...
//var...
//myName(param1) + myAge(param2) //output: IronMan 43

var myAge = function (edad){
    return edad;
}
var myName = function (nombre){
    return nombre;
}

myName ("Ironman") + " " +  myAge(37)






g) Intenta englobar todas las funciones en una sola funcion padre, 
el return de dicha función padre deberá ser la llamada a las funciones hijas

//function ... (){
//    var x = myName(param1)
//    var y = myAge(param2)
//    return x + y
//} //output: IronMan 40

function parent(name,age){
    var x = name;
    var y = age;
    return x + " " + y;
}

parent("Ironman",37);


h) Haz otra función hija que solo devuelva un número random, ese número random 
será el argumento que se pasará como parámetro a la función age()

//return x + y // output: IronMan 6457689
//http://www.w3schools.com/jsref/jsref_random.asp

function parent(name){
    var x = name;
    var y = function(){
        return Math.floor((Math.random() * 100000) + 1);
    }

    return x + " " + y(); //<<===== Si hay que inicializar la función para obtener su return (parentesis vacío si no precisa de argumentos)
}

parent("IronMan");
    

i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50

//return x + y // output: IronMan 3...Sure you're Tony Stark?



function parent(name){
    var x = name;
    var y = function(){
        var z = Math.floor((Math.random() * 50) + 1)
        if ( z <= 21){
            return z + " ...Sure you're Tony Stark?" 
        }
        else {
            return z + " Yes, you could be Tony Stark" 
        }
    }
    
    return x + " " + y()
}

parent("IronMan");




j) Al return de la función name(), concaténale otro mensaje

//return x + y // output: Tony Stark...aka IRONMAN, 34...Sure you're Tony Stark? 

function parent(name){
    var x = function(name){
        return name + "...aka IRONMAN, ";
    }
    var y = function(){
        var z = Math.floor((Math.random() * 50) + 1)
        if (z <= 21){
            return z + "... Sure you're Tony Stark?"
        }
        else{
            return z + "Yes, you could be Tony Stark"
        }
    }

    return x(name) + " " +y()
}

parent("IronMan");


k) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable

//return x + y // output: The first function returns: 'Tony Stark...aka IRONMAN', The second function returns: '34...Sure you're Tony Stark?' 

function parent(name){
    var x = function(name){
        return "The first function returns:" + name + "...aka IRONMAN, ";
    }

    var y = function(){
        var z = Math.floor((Math.random() * 50) + 1)
        if (z <= 21){
            return z + "... Sure you're Tony Stark?"
        }
        else{
            return", The second function returns:" + z + "Yes, you could be Tony Stark"
        }
    }

return x(name) + " " +y()
}

parent("IronMan");


l) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, no siga con la segunda llamada

//return x + y // output: "The first function returns: Hulk... You're not IRONMAN!"

function parent(name){
    var x = function(name){
        if (name == "IronMan"){
        return "The first function returns: " + name + "...aka IRONMAN";
        }
        else{
        return "The first function returns: " + name + "... You are not IRONMAN";
        }
    }
    var y = function(){
        if (name == "IronMan"){    
            var z = Math.floor((Math.random() * 50) + 1)
                    if (z <= 21 ){
                        return", The second function returns: " + z + " ... Sure you're Tony Stark?"
                        }
                    else{
                        return", The second function returns: " + z + " Yes, you could be Tony Stark"
                        }
                            }
        else {return ""}
        
    }

return x(name) + y(name)

}

parent("IronMan");






m) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. 
Retorna a la funcion padre y concaténalo en el return padre.

//function GenerateRandom(){
//    ...
//    return randomNumber.
//}

//function father(){
//    var numR = GenerateRandom()
//    return ...numR()...
//}


function generateRandom(){
    return Math.floor((Math.random() * 50) + 1);
};

function parent(name){
    var x = function(name){
        if (name == "IronMan"){
        return "The first function returns: " + name + "...aka IRONMAN";
        }
        else{
        return "The first function returns: " + name + "... You are not IRONMAN";
        }
    }
    var y = function(){
        if (name == "IronMan"){    
            var z = generateRandom();
                    if (z <= 21 ){
                        return", The second function returns: " + z + " ... Sure you're Tony Stark?"
                        }
                    else{
                        return", The second function returns: " + z + " Yes, you could be Tony Stark"
                        }
                            }
        else {return ""}
        
    }

return x(name) + y(name)

}

parent("IronMan");




n) Refactorizemos nuestro código dejando todas las funciones separadas del padre, éste último se encargará de llamarlas todas y mostrar sus resultados.

//function father(){
//    myFunction();
//    myOtherFunction();
//    myOtherVarFunction();
//    return...
//}

function generateRandom(){
    return Math.floor((Math.random() * 50) + 1);
};

function nameCheck(name){
    if (name == "IronMan"){
        return "The first function returns: " + name + "...aka IRONMAN";
        }
        else{
        return "The first function returns: " + name + "... You are not IRONMAN";
        }
};

function ageCheck(name){
     if (name == "IronMan"){   
        var z = generateRandom();
                    if (z <= 21 ){
                        return", The second function returns: " + z + " ... Sure you're Tony Stark?"
                        }
                    else{
                        return", The second function returns: " + z + " Yes, you could be Tony Stark"
                        }
        }
    else {return ""};
    };    

function parent(name){
    generateRandom();
    nameCheck(name);
    ageCheck(name);
    return nameCheck(name) + ageCheck(name);
};

parent("IronMan");


ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, muestra los resultados de esta array como siempre.

function generateRandom(){
    return Math.floor((Math.random() * 50) + 1);
};

function nameCheck(name){
    if (name == "IronMan"){
        return "The first function returns: " + name + "...aka IRONMAN";
        }
        else{
        return "The first function returns: " + name + "... You are not IRONMAN";
        }
};

function ageCheck(name){
     if (name == "IronMan"){   
        var z = generateRandom();
                    if (z <= 21 ){
                        return ", The second function returns: " + z + " ... Sure you're Tony Stark?"
                        }
                    else{
                        return ", The second function returns: " + z + " Yes, you could be Tony Stark"
                        }
        }
    else {return ""};
    };    

function parent(name){
    var arr = [];
    arr.push(generateRandom());
    arr.push(nameCheck(name));
    arr.push(ageCheck(name));
    console.log(arr);
};

parent("IronMan");








o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, deberá hacer otro push "hello from the dark side..." 
a la array que crea father(). Muestra toda la array completa.

function generateRandom(){
    return Math.floor((Math.random() * 50) + 1);
};

function nameCheck(name){
    if (name == "IronMan"){
        return "The first function returns: " + name + "...aka IRONMAN";
        }
        else{
        return "The first function returns: " + name + "... You are not IRONMAN";
        }
};

function ageCheck(name){
     if (name == "IronMan"){   
        var z = generateRandom();
                    if (z <= 21 ){
                        return ", The second function returns: " + z + " ... Sure you're Tony Stark?"
                        }
                    else{
                        return ", The second function returns: " + z + " Yes, you could be Tony Stark"
                        }
        }
    else {return ""};
    };    

function parent(name){
    var arr = [];
    /*arr.push(generateRandom());*/
    arr.push(nameCheck(name));
    arr.push(ageCheck(name));
    return arr;
    /*console.log(arr);*/
};


function granPa(name){
    var arrPa = [];
    arrPa.push("hello from the dark side...")
    parent(name).forEach(function(el){
        arrPa.push(el);
    });
    console.log(arrPa);
    
}


granPa("IronMan");


p) underage 👊🏼 Llama a ésta nueva función dos veces,
 muestra sus resultados por pantalla y compara sus randomNums, mostrando un mensaje indicando cual es mayor. 
 El nombre pasado por parámetro también deberá ser random entre una array de nombres, 
con lo cual, también deberás refactorizar las funciones hijas.

//function gandFather(){
//    var names = ['hulk', 'ironMan', '...']
//    var selectedName...
//    var selectedName2...
//    if(father(selectedName) > father(selectedName2))
//        ...
//    else
//        ...
//    return father(selectedName).push().join()...
//}


function doubleCall(){
    arr1 = []
    parent().forEach(function(el){
        arr1.push(el);
    })
    arr2 = []
    parent().forEach(function(el){
        arr2.push(el);
    })

    console.log(arr1);
    console.log(arr2);

    if (arr1[1] > arr2[1]){
        console.log(arr1[0]+" is older than "+arr2[0]);
    }else{
        console.log(arr2[0]+" is older than "+arr1[0]);
    }
}



function parent(){
    var parentArr = [];
    parentArr.push(randomHeroeName());
    parentArr.push(randomHereoAge());
    return parentArr;
};



function randomHereoAge(){
    return Math.floor((Math.random() * 50) + 1);
};

function randomHeroeName(){
var heroesSelection = ["IronMan","Thor","Hulk","Captain America","Black Panther"];
var randomheroenumber = Math.floor((Math.random() * heroesSelection.length));
return heroesSelection[randomheroenumber]
};

doubleCall();


p1) En lugar de retornar los valores como una array, prepara tus funciones para que devuelvan los resultados como OBJECTS. 
Muestra por pantalla los objetos sin estilizar el output.

function doubleCall(){
    var compareobj ={
        firstHeroe : "",
        secondHeroe : "",
    }
    compareobj.firstHeroe = parentObject();
    compareobj.secondHeroe = parentObject();

    
    console.log(compareobj);
};
/*    arr1 = []
    parent().forEach(function(el){
        arr1.push(el);
    })
    arr2 = []
    parent().forEach(function(el){
        arr2.push(el);
    })

    console.log(arr1);
    console.log(arr2);

    if (arr1[1] > arr2[1]){
        console.log(arr1[0]+" is older than "+arr2[0]);
    }else{
        console.log(arr2[0]+" is older than "+arr1[0]);
    }
}*/



/*function parent(){
    var parentArr = [];
    parentArr.push(randomHeroeName());
    parentArr.push(randomHereoAge());
    return parentArr;
};*/

function parentObject(){
    var parentHeroe ={
        randomHeroeName: "",
        randomHereoAge:""
    };
    parentHeroe.randomHeroeName = randomHeroeName();
    parentHeroe.randomHereoAge = randomHereoAge();
    return parentHeroe;

}





function randomHereoAge(){
    return Math.floor((Math.random() * 50) + 1);
};

function randomHeroeName(){
var heroesSelection = ["IronMan","Thor","Hulk","Captain America","Black Panther"];
var randomheroenumber = Math.floor((Math.random() * heroesSelection.length));
return heroesSelection[randomheroenumber]
};

doubleCall();







p2) Muestra los resultados de los OBJECTS recorriendolos 
y mostrando los valores de una forma amigable.

function doubleCall(){
    var compareobj ={
        firstHeroe : "",
        secondHeroe : "",
    }
    compareobj.firstHeroe = parentObject();
    compareobj.secondHeroe = parentObject();

    
    console.log("El primer heroe se llama " + compareobj.firstHeroe.randomHeroeName + " y tiene " + compareobj.firstHeroe.randomHereoAge + " años"
        + "\n" + "El segundo heroe se llama " + compareobj.secondHeroe.randomHeroeName + " y tiene " + compareobj.secondHeroe.randomHereoAge + " años");
};


function parentObject(){
    var parentHeroe ={
        randomHeroeName: "",
        randomHereoAge:""
    };
    parentHeroe.randomHeroeName = randomHeroeName();
    parentHeroe.randomHereoAge = randomHereoAge();
    return parentHeroe;

}





function randomHereoAge(){
    return Math.floor((Math.random() * 50) + 1);
};

function randomHeroeName(){
var heroesSelection = ["IronMan","Thor","Hulk","Captain America","Black Panther"];
var randomheroenumber = Math.floor((Math.random() * heroesSelection.length));
return heroesSelection[randomheroenumber]
};

doubleCall();

