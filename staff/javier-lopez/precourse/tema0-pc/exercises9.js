var data=["Javier", "Lopez", 20, "Terrassa", 1, 2, 3];
var buscador="Javier";
for(var i = 0;i<data.length;i++){
	if(data[i]===buscador){
		console.log("We find your data! "+data[i]);
	}
}