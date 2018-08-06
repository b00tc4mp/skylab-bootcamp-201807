//## Final Challenges (JS)!
//a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9,
// muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...),
// además, cada elemento de la pareja deberá estar multiplicada por 2.

function showNums(){
    var nums = [1,2,3,4,5,6,7,8,9]
    for(var i = 0; i < nums.length-1; i++){
        var pairs = []
        ...
    }
}
// output =>
//1ª pareja 2 - 4
//2ª pareja 4 - 6
//3ª pareja 6 - 8
//4ª pareja 8 - 10
//5ª pareja 10 - 12
//6ª pareja 12 - 14
//7ª pareja 14 - 16
//8ª pareja 16 - 18
Hint: Métodos útiles => push() - join() - map()


var nums = []
function arrayUnoNueve(){
    for(var i=1; i<9; i++){
        nums.push(i+"ª pareja " + (i*2) + " - " + (i+1)*2)
    }
    console.log(nums)
}
arrayUnoNueve()



//a1) La funcion debería aceptar la array a tratar como argumento.

function showNums(1,2,3,4,5){
    var nums = arguments...
    nums.map(...)
}
// output =>
// 1ª pareja 2 - 4
// 2ª pareja 4 - 6
// 3ª pareja 6 - 8
//...


function aver (nums, multBy){
    for (var i = 1; i < nums.length; i++) {
        console.log(i+"ª pareja "+ i*multBy + " - " + ((i+1)*multBy))
    }

}
aver([1,2,3,4,5,6,7,8,9], 2)


//map crea un nueva array
///////crea un nueva array a partir d otro
var nums = [1, 2, 3, 4]
    var newArr = nums.map(function(pepe){
        return pepe*multBy
    })
console.log(newArr) // [2 ,4, 6, 8]


//a2) Pasa también el numero a multiplicar a la función como argumento

function showNums(1,2,3,4,5,...,12){ //<= el último número de arguments lo podemos tratar como el numero multiplicador...
}
// output =>
// El numero escogido es: 12
// 1ª pareja 12 - 24
// 2ª pareja 24 - 36
// 3ª pareja 36 - 48
// 4ª pareja 48 - 60
// 5ª pareja 60 - 72
// ...
// HECHO!




//a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.

function showNums(1,2,3,4,5,...,12, 3){ // <= ahora, el último numero lo podriamos tomar como el delimitador
}
// output =>
// El numero escogido es: 12
// Se quieren mostrar las 3 primeras parejas
// 1ª pareja 12 - 24
// 2ª pareja 24 - 36
// 3ª pareja 36 - 48

function aTope(array, multBy, parejas){
    var arr = []
    for (var i = 1; i < array.length; i++) {
        arr.push(i+"ª pareja "+ i*multBy + " - " + ((i+1)*multBy))
    }
    for (var i=0; i<parejas; i++){
        console.log(arr[i])
    }
}







aTope([1,2,3,4,5,6,7,8,9], 12, 3)




//b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci? 
//https://www.mathsisfun.com/numbers/fibonacci-sequence.html




function fibo(){
    var arr = []
    var var1 = 0
    var var2 = 1
    var var3

    arr.push(var1, var2)

    for(var i=3; i<9;i++){
        var3 = var1 + var2
        var1 = var2
        var2 = var3
        arr.push(var3)
    }
    console.log(arr)
}
fibo()
//[0, 1, 1, 2, 3, 5, 8, 13]


//b2) Puedes añadir además, la posición de cada resultado?

//b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable. HECHO

//b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta donde queremos llegar.4


function fibo(posicion){
    var arr = []
    var var1 = 0
    var var2 = 1
    var var3

    arr.push(var1, var2)

    for(var i=3; i<=posicion;i++){
        var3 = var1 + var2
        var1 = var2
        var2 = var3
        arr.push(var3)
    }

    for(var i=0; i<arr.length; i++){
        console.log((i+1) + " - " + arr[i]) 
    }
}
fibo()

//////GERY
function fibo(){

    var y = 0;
    var z = 1;

    var fiboArray = []

    for (x = 0; x < 900; z = x) {

        x += y
        y = z
        fiboArray.push(x);
    }

    console.log(fiboArray)

}

fibo(); //[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]



//b5) Ahora, muestra los resultados en forma piramidal:

function fiboPymamid(num){}
0 arr[0]
0 1 
0 1 1
0 1 1 2
0 1 1 2 3
0 1 1 2 3 5
0 1 1 2 3 5 8 //To position. num
0 1 1 2 3 5
0 1 1 2 3
0 1 1 2
0 1 1
0 1
0


function fibo(posicion){
    var arr = []
    var var1 = 0
    var var2 = 1
    var var3

    arr.push(var1, var2)

    for(var i=3; i<=posicion;i++){
        var3 = var1 + var2
        var1 = var2
        var2 = var3
        arr.push(var3)
    }
    
}
fibo() //[0, 1, 1, 2, 3, 5, 8, 13]

///GERARDD
function fibo(){

    var y = 0;
    var z = 1;

    var fiboArray = []


    for (var x = 0; x < 8; z = x) {

        x += y
        y = z
        fiboArray.push(x);
        console.log(fiboArray.join(' '))

    }
    for (var i = fiboArray.length; i > 0; i--){
        fiboArray.pop(i)
        console.log(fiboArray.join(' '))
    }
}

fibo();

//c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos
// en otro diferente con las posiciones de los dígitos cambiadas, creandio un nuevo código

var code = 3712;
function codeScript(code){}
//output:
 ⬇︎//First call to codeScript()
- 7123
 ⬇︎//Second call to codeScript()
- 1237
 ⬇︎//Third call to codeScript()
- 2371
// At Four call, should return the original value
//El primer numero se traslada a la última posicion. El segundo, el tercero y el cuarto suben una posición.

function 





function codeScript(code){
    console.log(code.split("")) //solo funciona con strigns

}


codeScript(1234)



//c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez
// y devolver los dos códigos encriptados (Los dos códigos se deberían encriptar en la misma función)

function codeScript(code1, code2){}


c3) Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la posición de los dígitos, 
multiplicaremos a cada miembro por un numero cuya multiplicación no sea superior a 10. 
(Si es superior a 10, conseguiremos una multplicación de dos digitos y el código ya no sería de 4 valores)

c4) Ahora, implementa en otra funcion aparte el decrypter(), que recibirá como argumento un código encriptado (y correspondientemente multiplicado en el apartado c3) y nos devuelva el código desencriptado.

c5) Añade las dos funciones a la misma función padre, de forma que encripte y desencripte a la vez cuando termine de ejecutarse.

function codeScript(code1, code2){... codeDecrypt(code1Encrypt,code2Encrypt)}
c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá a varias letras. Podéis seguir este esquema.

var dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
}
function codeScript("HI  ", "WE  ", "NEED", "HELP"){}
"HI__" = "dictionary[7][0]+dictionary[8][0]+dictionary[9][2]+dictionary[9][2]..."


d) Crea un programa que use la encriptacion Romana, como es? Si tenemos la palabra SKYLAB,
 la palabra encriptada será SLKAYB. Si divides la palabra original en 2 grupos obtienes:

SKY
|-|-|
LAB Entonces, uniendo las primeras letras de cada grupo, las segundas y las terceras obtienes SLKAYB.
Entonces, el programa deberá recibir SKYLAB y retornar SLKAYB

d2) Programa el desencriptador, pasa como parámetro SLKAYB y que devuelva SKYLAB.

Hint: for decrypt, only catch the pair words like: S L K A Y B , then, you get SKY, the next step is catch the odd words, S L K A Y B, group the two groups and you get the original word.

d3) Agrupa la función Encrypt y decrypt en una unica función, de forma que introduzcas como parámetro SKYLAB y devuelva SKYLAB (con todas las transformaciones internas hechas y mostrando, entre medias, la transformación)

d4) Lo tienes? Prueba ahora con SKYLABCODERS. Cambia la función para que pueda aceptar palabras más largas.

e) Crea un programa al que le introduces un número como parámetro del 0 al 100 y devuelve el número transformado a alfabeto normal, es decir:

sayItWithWords(5) => //output Five
sayItWithWords(23) => //output twenty-three
sayItWithWords(71) => //output seventy-one
Hint:

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido, devolver también los números por los que está formado:

sayItWithWords(5) => //output Five, five / 5
sayItWithWords(23) => //output twenty-three, twenty + three / 20 + 3
sayItWithWords(71) => //output seventy-one, seventy + one / 70 + 1
e3) Cambia tu programa para que acepte cualquier número entre 0 y 1000.

sayItWithWords(500) => //output five hundred , five hundred  / 500
sayItWithWords(233) => //output two hundred thirty three, two hundred + thirty + three/ 200 + 30 + 3
sayItWithWords(498) => //output four hundred ninety eight, four hundred + ninety + eight/ 400 + 90 + 8
f) Recibiendo el siguiente texto por parámetro a tu función... :

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
Prepara dicha función para que modifique y devuelva el texto bajo estas reglas: Signos de puntuación: -	"." => "," - "," => "" Palabras: - "dolor" => "potato" - "lorem" => "tomato" - "labor" => "cucumber" - "consequatur" => "garlic" - "ipsum" => "onion"

f1) Añade una funcionalidad que cuente cuantos cambios/coincidencias ha encontrado de cada palabra, y te los muestre de una forma amigable para el usuario
