//PRIMERO HACEMOS VARIAS FUNCIONES UNA PARA EL NOMBRE, OTRA PARA EL CARTÓN, OTRA PARA LA LINEA, OTRA PARA EL BINGO, DESPEDIDA.ENLAZAMOS CON UNA FUNCIÓN PADRE AL FINAL.

function pedirNombre(){
  
         var name=prompt("Introducir nombre de usuario:");
          if(name==""||name==null){
            pedirNombre();
                        
          }
          else{
            return name;
          }
  
}

var carton = []

function throwRandoms(){
	return Math.floor(Math.random() * (90- 1+ 1));
}

function fillCarton(){
	
	for(var i = 1; i < 15; i++){
		carton.push(throwRandoms());
	}
 
  while(carton.length < 15){
      var numeroAleatorio = (throwRandoms());
      var existe = false;
      for(var i=1;i<carton.length;i++){
        if(carton[i] == numeroAleatorio){
            existe = true;
            break;
        }
  }
  if(!existe){
    carton[carton.length] = numeroAleatorio;
  }
  
}
   
  
	 var bingoCarton=carton.sort((a,b) => {
    return a - b;
	});
	
  console.log("["+ bingoCarton.slice(0,5).join("|")+"]");
  console.log("[" + bingoCarton.slice(5,10).join("|")+"]");
  console.log("[" + bingoCarton.slice(10,15).join("|")+"]");
  
}
function showNum (){
  var empezarJuego=confirm("¿Comenzamos el juego?");
  if(empezarJuego){
        
  var num= throwRandoms();
  console.log ("("+num+")");
}else{
  console.log("Adios!!");
}
  
}

 
 
 function playAgain(){
        var jugarotravez= confirm("¿Quieres jugar otra vez?");
        if(jugarotravez){
          console.log("Genial!! Empezamos de nuevo.");
           console.log(pedirNombre()+" ¿Estás preparado/a para comenzar otra vez?")
          fillCarton();
        }
          else{
            console.log("Adios!!");
          }
 }



function Bingo(){
  console.log("Bienvenido/a "+pedirNombre()+" ¿Estás preparado/a para comenzar?");
  
  fillCarton();
  showNum ();
  playAgain();
  
  
}
console.log(Bingo());
