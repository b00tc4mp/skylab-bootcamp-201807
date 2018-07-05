a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), además, cada elemento de la pareja deberá estar multiplicada por 2.

function showNums(){
    var nums = [1,2,3,4,5,6,7,8,9]
    var multy=nums.map(function (number){
      return number*2;
    }
    );
        
    for(var i = 0; i < multy.length-1; i++){
      console.log([i+1]+"º pareja "+multy[i]+"-"+multy[i+1]);
    }
}
 showNums(); 

 a1) La funcion debería aceptar la array a tratar como argumento.

function showNums(nums){
    
    var multy=nums.map(function (number){
      return number*2;
    }
    );
        
    for(var i = 0; i < multy.length-1; i++){
      console.log([i+1]+"º pareja "+multy[i]+"-"+multy[i+1]);
    }
}
 showNums([1,2,3,4,5,6,7,8,9]); 


a2) Pasa también el numero a multiplicar a la función como argumento.

function showNums(nums,mult){
    
    var multy=nums.map(function (number){
      return number*mult;
    }
    );
        
    for(var i = 0; i < multy.length-1; i++){
      console.log([i+1]+"º pareja "+multy[i]+"-"+multy[i+1]);
    }
}
 showNums([1,2,3,4,5,6,7,8,9],12); 

a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.

function showNums(nums,mult,delimit){
    
    var multy=nums.map(function (number){
      return number*mult;
    }
    );
        
    for(var i = 0; i <= delimit-1; i++){
      console.log([i+1]+"º pareja "+multy[i]+"-"+multy[i+1]);
    }
}
 showNums([1,2,3,4,5,6,7,8,9],12,3); 

b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci? 

function fibonacci(){

    var x = 0;
    var y = 1;
    var z;
    var num = 10;
    
    var t = '';
    t+=x +','+y;

    for(var i=0; i <= num-1;i++)
    {
        z = x + y;
        x = y;
        y = z;
        t+=','+z;
    }
    console.log(t);
}
fibonacci();

b2) Puedes añadir además, la posición de cada resultado?






































