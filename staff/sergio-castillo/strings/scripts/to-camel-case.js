function toCamelCase(string){
    var words=splitToWords(string);
    for(var i=0;i<words.length;i++){
        words[i]=words[i].toLowerCase();   
    }
    console.log(words);
    for (var i=0;i<words.length;i++){
       if(i>0){
        var aux=words[i].slice(0,1).toUpperCase();
        var aux2=words[i].slice(1);
        words[i]=aux+aux2;
       } 
    }
    return (words.join(""));
}

// Separar paraules amb split
// Pasar les dues a lowercase
// Posar la primera lletra menys de la primera en may