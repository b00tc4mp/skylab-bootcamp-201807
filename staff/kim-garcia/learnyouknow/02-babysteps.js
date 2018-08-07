let a = 0
for(let i = 2 ; i < process.argv.length; i++){
  a += +process.argv[i]
}
console.log(a)

//Otras opciones
const nums = [,, ...nums] = process.argv 
//hacer un reduce. Apuntes Manu