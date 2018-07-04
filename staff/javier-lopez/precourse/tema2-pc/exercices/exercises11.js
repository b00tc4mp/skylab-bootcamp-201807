//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...

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
}

AddMoreProperties(avenger);