//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...

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
}

addMoreProperties(avenger);