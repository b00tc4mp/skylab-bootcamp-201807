//a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto
// creado más arriba).


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};


function PropertyNames(ObjectName){
	console.log(Object.keys(ObjectName));
}

PropertyNames(avenger);