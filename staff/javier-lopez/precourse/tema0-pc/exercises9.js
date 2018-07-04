var data=["Javier", "Lopez", 20, "Terrassa", 1, 2, 3];
var Buscador="Javier";
for(var i = 0;i<data.length;i++){
	if(data[i]===Buscador){
		console.log("We find your data! "+data[i]);
	}
}