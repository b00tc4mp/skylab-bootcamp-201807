
console.log(hasSymbol('a') === false); // true
console.log(hasSymbol('ABC') === false); // true
console.log(hasSymbol('abc') === false); // true
console.log(hasSymbol('ñç') === false); // true
console.log(hasSymbol('') === false); // true
console.log(hasSymbol('.')); // true
console.log(hasSymbol(':')); // true
console.log(hasSymbol(';')); // true
console.log(hasSymbol('...')); // true
console.log(hasSymbol('abc;')); // true
console.log(hasSymbol(' ') === false); // true
console.log(hasSymbol('\t') === false); // true
console.log(hasSymbol('\n') === false); // true
console.log(hasSymbol(' \t\n') === false); // true
console.log(hasSymbol('#')); // true
console.log(hasSymbol('%')); // true
console.log(hasSymbol('$')); // true
console.log(hasSymbol('=')); // true
console.log(hasSymbol('123') === false); // true
console.log(hasSymbol('áéíóúàèìòùäëïöüâêîôûÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛñÑçÇ \t\n') === false); // true
