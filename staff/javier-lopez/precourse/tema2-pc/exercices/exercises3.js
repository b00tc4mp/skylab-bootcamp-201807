//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function ModifyPropertyValue(ObjectName){
	ObjectName.class = "XI";
	console.log(ObjectName);
}

PropertyNames(avenger);