console.log(countWords("hello world") === 2);
console.log(countWords("") === 0);
console.log(countWords("ç Ï à ñ 5") === 5);
console.log(countWords("  ") === 0);
console.log(countWords("one   two     three   four  five") === 5);
console.log(countWords("hola mundo \t\n") === 2);
console.log(countWords("... ,,, ;;; :::") === 0);