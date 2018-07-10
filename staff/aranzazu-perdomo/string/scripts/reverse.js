function reverse(string) {
    var container = "";
    for (var i = string.length - 1; i >= 0; i--) {
        container += string[i];
    }
    return container;
} 