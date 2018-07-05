window.onload = function() {
   display = document.getElementById("displayResult");
}

x = "0";
x1 = 1;
coma = 0;
z = 0; 
operation = "no";

function num(xx) { 
   if (x === "0" || x1 === 1) { 
      display.innerHTML = xx; 
      x = xx;
      if (xx === ".") { 
         display.innerHTML = "0.";
         x = xx; 
         coma = 1; 
      }
   } else { 
      if (xx === "." && coma === 0) { 
         display.innerHTML += xx;
         x += xx;
         coma = 1; 
      } else {
         display.innerHTML += xx;
         x += xx;
      }
   }
   x1 = 0 
}

function calculate(n) {
   z = x 
   operation = n;
   x1 = 1; 
}  

function result() {
   if (operation === "no") {
      display.innerHTML = x;  
   } else {
      solution = eval(z + operation + x);
      display.innerHTML = solution.toFixed(2);
      x = solution;
      operation = "no"; 
      x1 = 1; 
   }
}

function clearCalc() {
   display.innerHTML = 0; 
   x = "0";
   x1 = 1;
   coma = 0;
   z = 0; 
   operation = "no";
}