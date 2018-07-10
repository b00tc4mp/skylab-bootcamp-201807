function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)
    var wordReversed = string.split("").reverse().join("");
    return wordReversed;
}