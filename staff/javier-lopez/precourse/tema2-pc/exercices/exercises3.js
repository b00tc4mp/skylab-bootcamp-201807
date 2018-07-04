//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function modifyPropertyValue(objectName){
	objectName.class = "XI";
	console.log(objectName);
}

modifyPropertyValue(avenger);