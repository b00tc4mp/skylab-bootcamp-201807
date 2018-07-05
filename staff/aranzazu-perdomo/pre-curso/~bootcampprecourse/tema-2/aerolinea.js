var flights = [
{id: 00, to: "New York", from: "Barcelona", cost: 700,scale: false},
{id: 01, to: "Los Angeles", from: "Madrid", cost: 1100,scale: true},
{id: 02, to: "Paris", from: "Barcelona", cost: 210,scale: false},
{id: 03, to: "Roma", from: "Barcelona", cost: 150,scale: false},
{id: 04, to: "London", from: "Madrid", cost: 200,scale: false},
{id: 05, to: "Madrid", from: "Barcelona", cost: 90,scale: false},
{id: 06, to: "Tokyo", from: "Madrid", cost: 1500,scale: true},
{id: 07, to: "Shangai", from: "Barcelona", cost: 800,scale: true},
{id: 08, to: "Sydney", from: "Barcelona", cost: 150,scale: true},
{id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150,scale: false}
]

function obtenerNombre(){
  
        var nombreUsuario=prompt("Introducir nombre de usuario:");
        if(nombreUsuario==""|| nombreUsuario==null){
          obtenerNombre();
          
        }
        else{
          
          return nombreUsuario;
        }
  
  }


function listaDeVuelos(array_flights){
      console.log("Esta es la lista de vuelos:")
      var desde, hacia, coste, escala;
  for(var i = 0; i <= array_flights.length -1; i++){
    desde = array_flights[i].from;
    hacia = array_flights[i].to;
    coste= array_flights[i].cost;
    escala= array_flights[i].scale;
    if(escala == true){
      escala = "Con escala.";
    }else{
      escala = "Vuelo directo.";
    }

    console.log("Vuelo de " + desde + " con destino a " + hacia + ". Coste del vuelo: " + coste + ". " + escala);
  }
}

        
        
     

function costeMedio(array_flights){
   var coste = 0;

  for(var i = 0; i <= array_flights.length -1; i++){
    coste= coste + array_flights[i].cost;
  }

  return (coste / array_flights.length);
}

function vueloConEscala(_flights){
  
        var array_filtered = _flights.filter(
      function(_flights){
        return _flights.scale == true;
       }
      );
      return array_filtered.length;
  }
    
  function ultimosVuelos(array_flights){
  console.log("Los últimos vuelos son:");

  for(var i = 5; i <= array_flights.length -1; i++){
    desde = array_flights[i].from;
    hacia = array_flights[i].to;
    coste= array_flights[i].cost;
    escala= array_flights[i].scale;
    if(escala == true){
      escala = "Con escala.";
    }else{
      escala = "Vuelo directo.";
    }
  console.log("Vuelo de " + desde + " con destino a " + hacia + ". Coste del vuelo: " + coste + ". " + escala);
  }
  
}
 



function skylabAirlines (flights ){
  
 
  console.log("Bienvenido/a "+obtenerNombre());
  
  listaDeVuelos(flights );
  console.log ("El coste medio es de : "+ costeMedio(flights ));
  console.log ("Los vuelos con escala son: "+ vueloConEscala(flights));
  ultimosVuelos(flights);
  
  
  
}
skylabAirlines(flights);




