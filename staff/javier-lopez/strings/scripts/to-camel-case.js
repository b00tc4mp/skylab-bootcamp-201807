function toCamelCase(string){
    //TODO return string into camel
    var lower = string.toLowerCase();
    var word = lower.split(" ");
    var camelWord = "";
	var letterUpper = "";
	var restWord = "";
    var entireword = "";
    for(var i = 0; i<word.length;i++){
        if(i>0){
            letterUpper = word[i][0].toUpperCase();
			restWord = word[i].substring(1,word[i].length);
			entireword = letterUpper+restWord;
        }else{
		entireword = word[i];
        }
        camelWord = camelWord + entireword; 
    }
    return camelWord;
}