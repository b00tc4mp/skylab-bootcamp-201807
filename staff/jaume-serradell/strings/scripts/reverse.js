function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)

    console.log(string);
    var result = '';

    for (var i = string.length-1; i >= 0; i--) {
        result += string[i];
    }
    
    console.log(result);

    return result;
}