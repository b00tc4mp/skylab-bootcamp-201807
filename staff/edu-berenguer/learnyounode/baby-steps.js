//console.log(process.argv)
var res = 0;
for(var i = 2; i < process.argv.length;i++){
    res += +process.argv[i]
}
console.log(res);

// const[. . ...nums] = process.argv
