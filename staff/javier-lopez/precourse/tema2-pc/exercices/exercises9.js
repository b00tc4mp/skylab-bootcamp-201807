//g1) Asegura los cambios del ejercicio anterior.


//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function ShowPropertyRename(ObjectName){
	ObjectName.fullName=ObjectName.name;
	delete ObjectName.name;
	console.log(ObjectName.fullName);
}

ShowPropertyRename(avenger);