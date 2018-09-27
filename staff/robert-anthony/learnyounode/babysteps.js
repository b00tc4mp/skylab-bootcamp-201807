function babysteps(

) {

  const  [,,...nums] = process.argv

  const res = nums.reduce((accum,num) =>accum  Number(num),0)

  console.log(res)

 /* let sum = 0;
  for (let i = 2; i < process.argv.length; i++) {
  sum += parseFloat(process.argv[i])
  }*/
  console.log(sum)
}

babysteps()