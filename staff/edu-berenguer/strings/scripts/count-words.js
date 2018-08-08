// count words

function countWords(string) {
    var count = 0;
    var blankBefore = true;

    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        if (!isBlank(char)) {
            if (blankBefore && !hasSymbol(char)) {
                count++;

                blankBefore = false;
            }
        } else blankBefore = true;
    }

    return count;
}

/*//count words Mi versión
var symbols = [",",";",".",":","\t"," ","\n"];
//var symbols = [/[^\w\sà-úÀ-Úä-üÄ-Üâ-ûñç]/];
function countWords(string){
    var count = 0;
    for(var i =0; i < string.length;i++){
        var char = string[i];
        if(symbols.indexOf(char) === -1){
            count+=1;
            while(symbols.indexOf(char) === -1 && i < string.length){
                i++;
                char = string[i];
            }
        }
    }
    return count;
}*/