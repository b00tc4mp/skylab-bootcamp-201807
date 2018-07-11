console.log(hasSymbol('a')===false); // true
console.log(hasSymbol('abc')===false); // true
console.log(hasSymbol('')===false); // true
console.log(hasSymbol('.')); // true
console.log(hasSymbol(':')); // true
console.log(hasSymbol('...')); // true
console.log(hasSymbol('ñç')===false); // true
console.log(hasSymbol('abc;')); // true
console.log(hasSymbol(',')); // true
console.log(hasSymbol(' ')===false); // true
console.log(hasSymbol('\t')===false); // true
console.log(hasSymbol('\n ')===false); // true
console.log(hasSymbol(' \n\t')===false); // true
console.log(hasSymbol('=')); // true
console.log(hasSymbol('#')); // true