// rudimentary, but it works
// function isBlank(string) {
//     for (var i = 0; i < string.length; i++) {
//         var char = string[i];

//         if (char !== ' ' && char !== '\t' && char !== '\n') return false;
//     }

//     return true;
// }

function isBlank(string) {
    return /^\s*$/.test(string);
}