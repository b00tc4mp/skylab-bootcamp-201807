
var pantalla=document.getElementById("screenText"); //output screen.
var screenNum="0"; //save the number shown on the screen.
var newOld=1; //star new number or keep the old one : 1=yes; 0=no;
var coma=0; //coma state 0=no, 1=yes;
var firstNum = 0; //this will take the first number of the operation.
var operation = "no"; //this will tell us if there is any operation runing.

document.onkeydown = keyboard;
function number(num) { //takes de value of the pressed number.
         if (screenNum=="0" || newOld==1  ) { // initialize a number. 
            pantalla.innerHTML=num; //show the number on the screen.
            screenNum=num; //save the first number.
            if (num==".") { // if the first value is a coma then we will write '0.'
               pantalla.innerHTML="0."; 
               screenNum=num; //save the first number.
               coma=1; //change coma state.
               }
           }
           else { //keep writing numbers.
               if (num=="." && coma==0) { //if its the first time that we write a coma..
                   pantalla.innerHTML+=num;
                   screenNum+=num;
                   coma=1;  
               }
              //preventing from typing two comas.
               else if (num=="." && coma==1) {} 
               //write a number as usual.      
               else {
                   pantalla.innerHTML+=num;
                   screenNum+=num;
               }
            }
            newOld=0; //keep working with the same number/s.
         }

function operator(op) {
         result(); //check if there is any operation running.
         firstNum=screenNum; //we get the value of the first number to enable the usuer to write the second one.
         operation=op; //we capture the type of operation.
         newOld=1; //clean the screen to enable the user to write the second number.
         }  

function result() {
            coma = 0;
         if (operation=="no") { //check if there is any opereation in process.
            pantalla.innerHTML=screenNum;   //if the isn't then we will show the same number that we have on the screen.
            }
         else { //if there is any running operation then we will solve it.
            var strOperation=firstNum+operation+screenNum; // we will concatenate the values.
            var operationResult=eval(strOperation); //we will conver the string into code and then solve the operation.
            pantalla.innerHTML=operationResult; 
            screenNum=operationResult; 
            operation="no"; //we change the value to non operation in process.
            newOld=1; //and we will enable the screen reset option.
            }
        }

function squareRoot() {
         screenNum=Math.sqrt(screenNum); //squareRoot method.
         pantalla.innerHTML=screenNum; 
         operation="no"; 
         newOld=1;
         }

function porcent() { 
         screenNum=screenNum/100; 
         pantalla.innerHTML=screenNum; 
         result();//we call the method result because the % can we aplied once the operation has been complete. Eg. 150*40%.
         newOld=1; 
         }
function opuest() { 
            value=Number(screenNum); //convert the value into a number.
            value=-value; //change the sign
            screenNum=String(value); //convert again the value into string.
            pantalla.innerHTML=screenNum; 
            }
function inverse() {
         value=Number(screenNum);
         value=(1/value);
         screenNum=String(value);       
         pantalla.innerHTML=screenNum;
         newOld=1; 
         }
function xTimesTwo(){
        screenNum=screenNum*screenNum;
        pantalla.innerHTML=screenNum;
        newOld=1;

}
function deleteNum(){ //Delete ONLY the LAST NUMBER.
         numbers=screenNum.length; //get the number of numbers that we have on the screen.
         lastValue=screenNum.substr(numbers-1,numbers); //we get the last value.
         screenNum=screenNum.substr(0,numbers-1); //last value deleted.
         if (screenNum=="") {screenNum="0";} //if that was the last character then we will set the value to 0.
         if (lastValue==".") {coma=0;} //if the deleted value was a coma, the we will be able to write the coma again.
         pantalla.innerHTML=screenNum; 
         }
function clean() {
        pantalla.innerHTML=0; //Clean the screen;
        screenNum=0; //Clean screen number memory..
        coma=0; //coma reset.                  
        }
function cleanAll() {
        pantalla.innerHTML=0; //Clean the screen;
        screenNum=0; //Clean screen number memory..
        coma=0; //coma reset.  
         firstNum=0; //first number re-writed to 0;
         operation="no"; //set operation variable to none.
         }

function keyboard (key) { 
         keyEvent = key || window.event;
         k=keyEvent.keyCode; //key number code.
         //numeric keys of the alphanumeric keyboard.
         if (k>47 && k<58) { 
            p=k-48; //get the real number.
            p=String(p); //convert it to String.
            number(p); //send the value to be shown on the calculator screen.
            }   
         //Key numbers of the numeric keyboard. --Same procedure.
         if (k>95 && k<106) {
            p=k-96;
            p=String(p);
            number(p);
            }
         if (k==110 || k==190) {number(".");} //coma
         if (k==106) {operator('*');} //multi
         if (k==107) {operator('+');} //sum
         if (k==109) {operator('-');} //rest
         if (k==111) {operator('/');} //div
         if (k==32 || k==13) {result();} //equals: intro or space bar.
         if (k==46) {clearAll();} //Delete all: "supr"
         if (k==8) {deleteNum();} //recoil : recoil key.
         if (k==36) {clear();} //Parcial delete: start key.
         }

