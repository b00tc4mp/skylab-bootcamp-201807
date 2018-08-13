let res = 0
for (let index = 2; index < process.argv.length; index++) {
    res += +process.argv[index]      
}
console.log (res)

//Another Way
//const [, , ...nums] = process.argv
// const res = nums.reduce((accum, num) => accum + Number(num),0)
// console.log(res)