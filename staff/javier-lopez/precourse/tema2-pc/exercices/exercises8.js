//g) Cambia la propiedad name por fullName. (DUDAS)

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};


function PropertyRename(ObjectName){
	ObjectName.fullName=ObjectName.name;
	delete ObjectName.name;
}

PropertyRename(avenger);