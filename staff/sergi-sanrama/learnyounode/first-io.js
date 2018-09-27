
var fs = require('fs')

var content = fs.readFileSync(process.argv[2]).toString()

console.log(content.split('\n').length-1)

/* Otra opcion:
const fs =require('fs')

const { argv: [, , file] } = process // Bytes

const text = fs.readFileSync(file).toString() //tenemos que pasar a string, porque nos devuelve un Buffer, q es una acumulacion de bytes de algo, son la representacion de "algo" para verlo podemos debugar, node debug, apretar "n" para next step, y al llegar hacer un "exec" de lo que queremos examinar. El readFyleSinc, este metodo es bloqueante, hasta q no termine de leer y almacenar los bytes en la const text, no pasara a las siguientes lineas de codigo.
//ahora ya tenemos el text, ahora tenemos q imrpimir linea a linea

console.log(text.split('\n').length - 1)

*/
