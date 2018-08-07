function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)
    var frase = ""
    for (var i = string.length -1; i >= 0; i--){
        frase += string[i];
    }
    return frase;

}

