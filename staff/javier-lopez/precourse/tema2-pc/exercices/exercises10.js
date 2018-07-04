//h) Lista todas las propiedades del objeto a través de un console.log() (DUDAS)

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};
//For in (Higher order function)
function ShowAllProperties(ObjectName){
	console.log("Hi there, I'm "+ObjectName.name+" and my class is "+ObjectName.class+", so my id is "+
		ObjectName.id);	
}

ShowAllProperties(avenger);