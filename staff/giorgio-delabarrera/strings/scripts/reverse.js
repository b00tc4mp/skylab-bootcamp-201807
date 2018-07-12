function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)

    var reverseString = '';
    var len = string.length;

    for (var i = len; i > 0; i--) {
        reverseString += string[i - 1];
    }

    return reverseString;
}