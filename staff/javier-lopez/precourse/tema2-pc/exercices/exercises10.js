//h) Lista todas las propiedades del objeto a través de un console.log() (DUDAS)

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};
//For in (Higher order function)
function showAllProperties(objectName){
	console.log("Hi there, I'm "+objectName.name+" and my class is "+objectName.class+", so my id is "+
		objectName.id);	
}

showAllProperties(avenger);