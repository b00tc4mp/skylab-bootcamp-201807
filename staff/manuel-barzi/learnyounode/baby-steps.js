const [, , ...nums] = process.argv
// const nums = process.argv.slice(2)

const res = nums.reduce((accum, num) => accum + Number(num), 0)

console.log(res)



