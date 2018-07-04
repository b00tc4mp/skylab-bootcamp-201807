//h2) Asegura los cambios volviendo a listar los valores del objeto

//Object
var avenger = { 
	//Property
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function AddMoreProperties(ObjectName){
	ObjectName.country = "United States";
	ObjectName.job = "Hero";
	ObjectName.partner = "Doctor Strange";
	ObjectName.enemy = "Thanos";
	console.log(ObjectName);
}

AddMoreProperties(avenger);