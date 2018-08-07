// var result = 0

// for (var i = 2; i < process.argv.length; i++) {
//     result += Number(process.argv[i])
// }

// console.log(result)



// OTHER VERSION

//destructuring spread operator
const [, , ...nums] = process.argv


const res = nums.reduce((accum, num) => accum + Number(num), 0)

console.log(res)