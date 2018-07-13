// a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.

function wellcome (myName){
	console.log("Hello "+myName);
}

wellcome("Jordi Ubanell");


// b) Intenta retornar los valores en lugar de usar console.log

function wellcome (myName){
	return("Hello "+myName);
}

wellcome("Jordi Ubanell");


// c) Ahora, añade tu edad y concaténala al return

function wellcome (myName, myAge){

	return("Hello "+myName+ " you're "+myAge+ " years old." );
}

wellcome("Jordi Ubanell", 48);


// d) Iguala tu función a una variable y ejecútala

var myFunction = function (myName, myAge) {
	return("Hello "+myName+ " you're "+myAge+ " years old." );
}

myFunction("Jordi Ubanell", 48);


// e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable, intenta imprimir sus dos resultados concatenados

function result(name){ 
 	return(myName)
} 

function myAge(age){
	return(myAge)
}

function result(){
	return (myName + myAge)
}

myName("Jordi Ubanell");
myAge(48);
result();

__________

var myFunction = function (myName, myAge) {
	myName = name;
	myAge = age;
	return("Hello "+name+ " you're "+age+ " years old." );
}

myFunction("Jordi Ubanell", 48);

// 

function jordi() {

	function myName(name) {
		console.info("Name: "+name);
	}

	var funcName=myName;

	funcName("fdsfsd");

}

jordi();

//

function get_my_age(){
	return 48;
}

my_age = get_my_age();
console.log(my_age);



///////////////////



function get_my_name(){
    return 'Jordi';
}

function get_my_age(){
    return 48;
}

function valores(name, age){
    return name + ' ' + age;
}

var my_output = get_my_name() + ' ' + get_my_age();
var my_output_2 = valores("Jordppp", 48);
console.log(my_output);
console.log(my_output_2);

_____________



function get_my_name(){
    return 'Jordi';
}

function get_my_age(){
    return 48;
}

var my_output = get_my_name() + ' ' + get_my_age();
console.log(my_output);

-----------------

// Sumar entre 1 y 10



function get_my_name(){
    return 'Jordi';
}

function get_my_age(){
    return 48;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

var my_output = get_my_name() + ' ' + ( get_my_age() + my_random_number(1,10) );
console.log(my_output);

// f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.



function get_my_name(name){
    return name;
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

var my_output = get_my_name('Jordi') + ' ' + ( get_my_age(48) + my_random_number(1,10) );
console.log(my_output);


// g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada a las funciones hijas



function get_my_name(name){
    return name;
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var name = get_my_name('Jordi');
    var age = get_my_age(48);
    return name + ' ' + age;
}

var my_output = get_my_result();
console.log(get_my_result());


// h) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se pasará como parámetro a la función age()



function get_my_name(name){
    return name;
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var name = get_my_name('Jordi');
    var age = get_my_age(my_random_number(0, 100000));
    return name + ' ' + age;
}

var my_output = get_my_result();
console.log(get_my_result());


// i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50



function get_my_name(name){
    return name;
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var name = get_my_name('Jordi');
    var age = get_my_age(my_random_number(0, 50));
    var result = '';
    if (age <= 20) {
        result = 'Edad menor o igual a 20';
    } else if (age>20 && age<=50) {
        result = 'Edad mayor a 20 y menor o igual a 50';
    }
    return result;
}

var my_output = get_my_result();
console.log(get_my_result());


// j) Al return de la función name(), concaténale otro mensaje


function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var name = get_my_name('Jordi');
    var age = get_my_age(my_random_number(0, 50));
    return name + ' ' + age;
}

var my_output = get_my_result();
console.log(get_my_result());


/// l) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, no siga con la segunda llamada


function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var name = get_my_name('Ricardo');
    if(name != 'Jordi Ubanell'){
        return 'No eres jordi';
    }else{
        var age = get_my_age(my_random_number(0, 50));
        return name + ' ' + age;
    }
   
    
}

var my_output = get_my_result();
console.log(get_my_result());


// m) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. Retorna a la funcion padre y concaténalo en el return padre.
 
// ya está hecho en los anteriores, en la función random


// n) Refactorizemos nuestro código dejando todas las funciones separadas del padre, éste último se encargará de llamarlas todas y mostrar sus resultados.



function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var name = get_my_name('Ricardo');
    var age = get_my_age(my_random_number(0, 50));
    return name + ' ' + age;
}

var my_output = get_my_result();
console.log(get_my_result());

// ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, muestra los resultados de esta array como siempre.

function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var my_array = new Array();
    my_array.push( get_my_name('Ricardo') );
    my_array.push( get_my_age(my_random_number(0, 50)) );
    return my_array;
}

var my_output = get_my_result();
console.log(my_output);

// o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, deberá hacer otro push "hello from the dark side..." a la array que crea father(). Muestra toda la array completa.



function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(){
    var my_array = new Array();
    my_array.push( get_my_name('Ricardo') );
    my_array.push( get_my_age(my_random_number(0, 50)) );
    return my_array;
}

function father(){
    var my_current_array = get_my_result();
    my_current_array.push('Hello from the dark side');
    return my_current_array;
}

var my_output = father();
console.log(my_output);


//  Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y compara sus randomNums, mostrando un mensaje indicando cual es mayor. El nombre pasado por parámetro también deberá ser random entre una array de nombres, con lo cual, también deberás refactorizar las funciones hijas.



function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(name){
    var my_array = new Array();
    my_array.push( get_my_name(name) );
    my_array.push( get_my_age(my_random_number(0, 50)) );
    return my_array;
}

function father(){
    var names = ['Alex', 'Dani', 'Joel'];
    var selectedName = names[my_random_number(0, names.length)];
    var selectedName2 = names[my_random_number(0, names.length)];
    var selectedArray = get_my_result(selectedName);
    var selectedArray2 = get_my_result(selectedName2);
    console.log(selectedArray[1]);
    console.log(selectedArray2[1]);
    if( selectedArray[1] > selectedArray2[1] ){
        console.log('el array 1 es mayor');
    }else{
        console.log('el array 1 es menor o igual al array 2');
    }
}

father();

// p1) En lugar de retornar los valores como una array, prepara tus funciones para que devuelvan los resultados como OBJECTS. Muestra por pantalla los objetos sin estilizar el output.




function get_my_name(name){
    return name + " Ubanell";
}

function get_my_age(age){
    return age;
}

function my_random_number(start, end){
    return Math.floor((Math.random() * end) + start);
}

function get_my_result(name){
    var my_obj = {};
    my_obj.name = get_my_name(name);
    my_obj.age = get_my_age(my_random_number(0, 50));
    console.log(my_obj);
    return my_obj;
}

function father(){
    var names = ['Alex', 'Dani', 'Joel'];
    var selectedName = names[my_random_number(0, names.length)];
    var selectedName2 = names[my_random_number(0, names.length)];
    var selectedObj = get_my_result(selectedName);
    var selectedObj2 = get_my_result(selectedName2);
    console.log(selectedObj.age);
    console.log(selectedObj2.age);
    if( selectedObj.age > selectedObj2.age ){
        console.log('el obj 1 es mayor');
    }else{
        console.log('el obj 1 es menor o igual al obj 2');
    }
}

father();

/// 

