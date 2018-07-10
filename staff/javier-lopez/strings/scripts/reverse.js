function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)
    var arrayReversed = string.split("").reverse();
    var wordReversed = arrayReversed.join("");
    return wordReversed;
}