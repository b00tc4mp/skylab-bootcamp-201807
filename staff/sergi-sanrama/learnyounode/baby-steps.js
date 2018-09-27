

// function sumNumber (a, b){
//    for(var i=2; i=process.argv.length; i++){
//       return( Number(process.argv[i]) + Number(process.argv[i+1]))
//    }
// }

var resultado = 0
for (var i = 2; i < process.argv.length; i++)
  resultado += +process.argv[i]

  console.log(resultado)

  /* otras opciones: 
const [,, ...nums] = process.argv //cogemos a partir del 3elemento, pues el primero es node y el segundo es la ruta. 

const res = nums.reduce((accum, num) => accum + Number(num), 0)

console.log(res)

otra:
const nums = process.argv.slice(2)

  */