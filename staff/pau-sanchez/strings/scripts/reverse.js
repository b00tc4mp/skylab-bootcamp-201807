function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)
    var rev = "";

    for (var i = string.length-1; i >= 0; i--){
        rev += string[i];
    }
    
    return rev;
}