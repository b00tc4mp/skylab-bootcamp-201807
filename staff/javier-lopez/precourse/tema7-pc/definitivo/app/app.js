
//Funcion que se inicia al cargar la pagina
window.onload = function(){
   //elemento pantalla de salida
   pantalla=document.getElementById("result"); 
}

//número en pantalla
initialNumber="0";

op="no"; //operación en curso; "no" =  sin operación.

//iniciar número en pantalla: 1=si; 0=no;
xi=1;

ni=0; //número oculto o en espera.

//Iniciamos la variable, será true si quiero coma y false si no.
coma=true;



//mostrar número en pantalla según se va escribiendo:
//recoge el número pulsado en el argumento.
function number(character) { 
         //inicializar un número, 
         if (initialNumber=="0" || xi==1) { 
            //mostramos en pantalla el numero que le hemo pasado con el boton
            pantalla.innerHTML=character;

            //guardar número
            initialNumber=character;

            //si escribimos una coma al principio del número
            if (character==".") {
               //escribimos 0. 
               pantalla.innerHTML="0.";
               //guardar número
               initialNumber=character;

               //cambiar estado de la coma
               coma=true;
               }
           }
           else { //continuar escribiendo un número
               if (character=="." && coma==true) { //si escribimos una coma decimal por primera vez
                   pantalla.innerHTML+=character;
                   initialNumber+=character;
                   coma=true; //cambiar el estado de la coma  
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (character=="." && coma==true) {} 
               //Resto de casos: escribir un número del 0 al 9:    
               else {
                   pantalla.innerHTML+=character;
                   initialNumber+=character
               }
            }
            xi=0 //el número está iniciado y podemos ampliarlo.
         }

function igualar() {
         if (op=="no") { //no hay ninguna operación pendiente.
            pantalla.innerHTML=initialNumber;   //mostramos el mismo número   
            }
         else { //con operación pendiente resolvemos

            //escribimos la operación en una cadena (numero pendiente+operacion+el numero introducido)
            sl=ni+op+initialNumber; 
            sol=eval(sl) //convertimos la cadena a código y resolvemos
            pantalla.innerHTML=sol //mostramos la solución
            initialNumber=sol; //guardamos la solución
            op="no"; //ya no hay operaciones pendientes
            xi=1; //se puede reiniciar la pantalla.
            }
        }

function operar(s) {
         igualar() //si hay operaciones pendientes se realizan primero
         ni=initialNumber //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operación.
         xi=1; //inicializar pantalla.
         }

function deleteResult() {
         pantalla.innerHTML=0; //poner pantalla a 0
         initialNumber="0"; //reiniciar número en pantalla
         coma=false; //reiniciar estado coma decimal 
         ni=0 //indicador de número oculto a 0;
         op="no" //borrar operación en curso.
         } 

function raizc() {
         initialNumber=Math.sqrt(initialNumber) //resolver raíz cuadrada.
         pantalla.innerHTML=initialNumber; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla 
         }

function porcent() { 
         initialNumber=initialNumber/100 //dividir por 100 el número
         pantalla.innerHTML=initialNumber; //mostrar en pantalla
         igualar() //resolver y mostrar operaciones pendientes
         xi=1 //reiniciar la pantalla
         }