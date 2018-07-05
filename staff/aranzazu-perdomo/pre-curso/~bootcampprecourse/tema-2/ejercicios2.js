
a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)


function mostrarClave (myObject){
  
  for (let key in myObject){
    
    console.log(key);
  }
  
  
}
  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  mostrarClave(avenger);

//Otro método más fácil de resolver

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

 console.log(Object.keys(avenger));

  b) Ahora, crea una función que liste solo los valores de las propiedades.

function mostrarValores (myObject){
  
  for (let key in myObject){
    
    console.log(avenger[key]);
  }
  
  
}
  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  mostrarValores(avenger);


  //Otra forma de resolver más fácil

   var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

 console.log(Object.values(avenger));
  

  c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

function cambiarValores (myObject,proptoChange,newValue){
  
  for (let key in myObject){
      if(key==proptoChange){
        myObject[key]=newValue;
      }
    console.log(key +" = "+myObject[key]);
  }
  
  
}
  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  cambiarValores(avenger,"class","XI");
  

d) Ahora, elimina la propiedad ID y asegura los cambios.

function eliminarValor (myObject,proptoDelete){
  
  for (let key in myObject){
      if(key==proptoDelete){
       delete myObject[key];
      }
  
  }
  
  
}
  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  eliminarValor(avenger,"id");
  
  console.log(avenger.id);


e) Añade una nueva propiedad, por ejemplo city y dale un valor.


function nuevaPropiedad (myObject,newPropiedad, newValue){
  
       
        myObject[newPropiedad]=newValue;
      
         console.log(newPropiedad +" = "+newValue);
  
  
}

  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  nuevaPropiedad(avenger,"city","California");


  e1) Asegura los cambios solo imprimiendo esa nueva propiedad.

  console.log(avenger.city);

f) Lista el numero de propiedades que contiene el objeto.

function numeroPropiedades (myObject){
          var contador=0;
          for(let key in myObject){
                contador++;
            
          }
        console.log(" There are "+contador+" info fields");
  
}
  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  
  numeroPropiedades(avenger);


  g) Cambia la propiedad name por fullName.

	function cambiaPropiedad (myObject,propiedadCambio,newProp){
          myObject[newProp]=myObject[propiedadCambio];
          delete myObject[propiedadCambio];
}
  
  var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
  
  cambiaPropiedad(avenger,"name","Fullname");
  
 g1) Asegura los cambios


  console.log(avenger.Fullname);




h) Lista todas las propiedades del objeto a través de un console.log()

function listaPropiedades(myObject){
    
    console.log("Hola, soy "+myObject.name+"tengo "+myObject.age+" años");
    
  
  }
  var datos={
      name:"Aranzazu",
      age:32,
   
   
    
  }
listaPropiedades(datos);





 h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...

function addNewProperty (myObject){
  
   datos.location="Arrecife";
   datos.country="Spain";
}
var datos={
      name:"Aranzazu",
      age:32,
   
    
  }
addNewProperty(datos);
console.log(datos.location);
console.log(datos.country);


) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, creando una instancia del objeto con las propiedades de nuestro objeto creado

function avenger (name,city,job,enemy){
    this.name=name;
    this.city=city;
    this.job=job;
    this.enemy=enemy;
    
}
 var spiderman=new avenger ("Spiderman","New york", "student","Hobgoblin")
 var thor=new avenger ("Thor","Asgard","Dios", "Locky")
console.log(spiderman);
console.log(thor);

k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. . Example of property:

function avenger (name,city,job,enemy){
    this.name=name;
    this.city=city;
    this.job=job;
    this.enemy=enemy;
    this.description= function(){
      console.log("Soy " + this.name + " de "+ this.city)
    };
    
}
 var spiderman=new avenger ("Spiderman","New york", "student","Hobgoblin")
 var thor=new avenger ("Thor","Asgard","Dios", "Locky")
 thor.description()




l) Ahora, crea una función que solo liste los nombres de los objetos instanciados

function avenger (name,city,job,enemy){
    this.name=name;
    this.city=city;
    this.job=job;
    this.enemy=enemy;
    this.description= function(){
      console.log("Soy " + this.name + " de "+ this.city)
    };
    
}
 var spiderman=new avenger ("Spiderman","New york", "student","Hobgoblin")
 var thor=new avenger ("Thor","Asgard","Dios", "Locky")
 
var arrOfAvengers = [thor, spiderman]

function showNamesOfAvengers (){

	arrOfAvengers.forEach(function(avenger){
		console.log(avenger.name)
	})
}
showNamesOfAvengers ()





m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.

function mismaCiudad(arrayOfObjects,sameCity){
	var filteredMembers = arrayOfObjects.filter(
		function(xMember) {
			return xMember.city == sameCity;
		}
	); 

	var list = "";
	filteredMembers.forEach(
		function(xMemberFiltered){
			if(list != ""){
				list += ", ";
			}
			list += xMemberFiltered.name;
		}
	);

	return "Hay " + filteredMembers.length + " miembros de la ciudad de " + sameCity + ". Son: " + list;
}


function Member(name, city){
	this.name = name;
	this.city = city;
}


var tony = new Member("Tony", "New York");
var spiderman = new Member("Spiderman", "New York");
var thor = new Member("Thor", "Asgard");


var listOfMembers = [tony,spiderman,thor];


console.log(mismaCiudad(listOfMembers,"New York"));







n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.


function obtenerEdadMedia (arrayOfObject,prop){
	       var sum=0;
				 arrayOfObject.forEach(
					 function(xMiembros){
					       sum= sum + xMiembros[prop];
					 
					 }
				 
				 );
	
	           return ("La media es de "+ (sum/arrayOfObject.length).toFixed(2)+ " años");
	
}


function miembros(name,age){
	
	 this.name=name;
	 this.age=age;
	
	
	
}
 var Aranzazu=new miembros("Aranzazu",32);
 var Elena=new miembros("Elena",26);
 var Jorge=new miembros("Jorge",42);


var lista=[Aranzazu,Elena,Jorge];


console.log(obtenerEdadMedia(lista,"age"));


ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.

function batalla (arrayOfMembers){
	
	     var battle = "";
	for(var i = 0; i <= arrayOfMembers.length - 1; i = i+2){
		battle = arrayOfMembers[i].name + " vs " + arrayOfMembers[i +1].name ;
		if(arrayOfMembers[i].markAverage > arrayOfMembers[i +1].markAverage){
			
			battle += " => "+ arrayOfMembers[i].name + " es mejor!";
		}else if (arrayOfMembers[i].markAverage == arrayOfMembers[i +1].markAverage){
			
			battle += "Ambos están empatados!";
		}else{
			
			battle += " => "+ arrayOfMembers[i +1].name + " es mejor!";
		}
		console.log(battle);
}
	
	
}

function Member(id,name, city,markAverage  ){
	this.id=id;
	this.name = name;
	this.city = city;
	this.markAverage = markAverage ;
}

var HawkEye = new Member(1,"HawkEye","Coney Island",600);
var tony = new Member(2,"Tony", "New York",800);
var thor = new Member(3,"Thor", "Asgard",1000);
var Hulk= new Member (4,"Hulk","New York",4000);
var CapitanAmerica= new Member (5,"Capitan América","New York",2750);
var Vision=new Member (6,"Vision","Chicago",2800);


var lista =[HawkEye,tony, thor,Hulk, CapitanAmerica,Vision];

console.log(batalla(lista));


ñ1) Intenta crear las parejas de forma aleatoria.

function mezclarAleatorio (arrayOfMembers){
                for (i=0; i<=arrayOfMembers.legth-1;i=i+2){
                  if(arrayOfMembers[i+1]==undefined){
                    console.log("Desemparejado =>"+arrayOfMembers[i].name);
                  }
                  else{
                    console.log("Pareja =>" +arrayOfMembers[i].name +"\/"+arrayOfMembers[i+1].name);
                  }
              }
                
                }
  function suffle (array){
    var currentIndex=array.legth;
    var temporyValue;
    var randomIndex;
    
    while (0!==currentIndex){
      
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
      
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
      
    }
    
    return (array);
    
    }
 
  

function Member(id,name, city,markAverage  ){
	this.id=id;
	this.name = name;
	this.city = city;
	this.markAverage = markAverage ;
}

var HawkEye = new Member(1,"HawkEye","Coney Island",600);
var tony = new Member(2,"Tony", "New York",800);
var thor = new Member(3,"Thor", "Asgard",1000);
var Hulk= new Member (4,"Hulk","New York",4000);
var CapitanAmerica= new Member (5,"Capitan América","New York",2750);
var Vision=new Member (6,"Vision","Chicago",2800);


var lista =[HawkEye,tony, thor,Hulk, CapitanAmerica,Vision];

    lista = suffle(lista);

console.log(mezclarAleatorio(lista));








  
 


















  