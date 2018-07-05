//g) Cambia la propiedad name por fullName. (DUDAS)

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};


function propertyRename(objectName){
	objectName.fullName=objectName.name;
	delete objectName.name;
}

propertyRename(avenger);