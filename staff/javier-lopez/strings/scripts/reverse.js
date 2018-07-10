function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)
    word= "";
    for(var i = string.length-1;i>=0;i--){
        word=word+string[i];
    }
    console.log(word);
    return word;
}