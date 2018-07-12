console.log(countWords('hello word') === 2);
console.log(countWords('') === 0);
console.log(countWords('1 2 3 4 5') === 5);
console.log(countWords(' 	') === 0);
console.log(countWords('one   two       three   four     five') === 5);
console.log(countWords('hola mundo \t\n') === 2);
console.log(countWords('... ,,, ;;; :::') === 0);
