//h2) Asegura los cambios volviendo a listar los valores del objeto

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function addMoreProperties(objectName){
	objectName.country = "United States";
	objectName.job = "Hero";
	objectName.partner = "Doctor Strange";
	objectName.enemy = "Thanos";
	console.log(objectName);
}

addMoreProperties(avenger);