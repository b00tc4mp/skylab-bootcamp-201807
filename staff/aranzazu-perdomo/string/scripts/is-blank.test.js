console.log(isBlank('a') === false); // true
console.log(isBlank('abc') === false); // true
console.log(isBlank(' ')); // true
console.log(isBlank('\t')); // true
console.log(isBlank('\n')); // true
console.log(isBlank('')); // true
console.log(isBlank(' \t\n')); // true
console.log(isBlank(' \t\n &%$@') === false); // true