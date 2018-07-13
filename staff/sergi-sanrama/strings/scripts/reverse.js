//console.log(reverse('hello world') === 'dlrow olleh');

function reverse(string) {
    // TODO reverse string using a standar loop (use of split, reverse, and join is forbidden)

    var stringReverse = '';

    for (var i = string.length-1; i >= 0; i--) {
       var letter = string[i]; // "d", primer element del array inverse
        stringReverse += letter; //anem afegint els elements
    }
    return stringReverse;


}