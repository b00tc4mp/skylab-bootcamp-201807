//g1) Asegura los cambios del ejercicio anterior.


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function showPropertyRename(objectName){
	objectName.fullName=objectName.name;
	delete objectName.name;
	console.log(objectName.fullName);
}

showPropertyRename(avenger);