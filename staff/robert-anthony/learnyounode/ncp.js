const fs = require('fs')

const {argv:[,,sourcefile,destfile]} = process


//fs.copyFile(sourcefile,destfile,err =>console.log(err))



fs.readFile(sourcefile,(err,data) =>{
  if (err) throw err
  fs.writeFile(destfile,data,(err) =>{ if(err) throw err})
})