
function isSpace(value) {
    return [" ","	"].indexOf(value) > -1;
  };
  
  function countWords(string) {
      var count = 0;
      if (string.length) {
          if (!isSpace(string[0])) { count++ };
          for (var i = 1; i < string.length; i++) {
              var curr = string[i];
              var prev = string[i - 1];
              if (!isSpace(curr) && isSpace(prev)) {
                  count++;
              }
          }
      }
      return count;
  };



console.log(countWords('hello world')===2);
console.log(countWords('')===0);
console.log(countWords('1 2 3 4 5')===5);
console.log(countWords('   ')===0);
console.log(countWords('one two three four five')===5);

//split to words
//version alejandro

function isSpace(value) {
    return [" ","	"].indexOf(value) > -1;
  };

function splitToWords(string){
   var arr=[];
   var tr="";

   for(var i=0; i<=string.length; i++){
        while(isSpace(string[i])){
            ++i;
        };
    if(!isSpace(string[i])){
               tr +=string[i];
        }else{
            arr.push(tr);
            tr="";
        }
        arr.push(tr);
        return arr;
   }


    //tTODO IMPLEMENT USING STANDARD LOOP
}

var words = splitToWords(" hello Words");

console.log(w)

//version mia
function splitToWords(string) {
    var arr = [];
    var buf = "";
    for(var i = 0; i < string.length; i++) {
        buf += string[i];
        if(string[i] == " ") {
            arr.push(buf);
            buf = "";
        }
    }
    
    if(buf.length > 0) {
        arr.push(buf);
    }
     return arr;
    }
    
    var words = splitToWords('hello world');
    
    console.log(words.length === 2); // => true
    console.log(words[0] === 'hello'); // => true
    console.log(words[1] === 'world'); // => true



//finds words  (that match expression in provided function)

// find words (that match expression in provided function)

function findWords(string, func) {
    // TODO: implement using a standard loop
}

var words = findWords('hello world', function(word) { 
    return word.indexOf('e') > -1; 
});

console.log(words.length === 1); // => true
console.log(words[0] === 'hello'); // => true

var words = findWords('hello world, hello universe', function(word) { 
    return word.indexOf('o') > -1; 
});

console.log(words.length === 3); // => true
console.log(words[0] === 'hello'); // => true
console.log(words[1] === 'world'); // => true
console.log(words[2] === 'hello'); // => true