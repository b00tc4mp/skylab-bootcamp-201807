function reverse(string) {
    var reversed = '';
    for(var i=string.length-1; i >= 0; i--)
        reversed += string[i];
    return reversed;
}