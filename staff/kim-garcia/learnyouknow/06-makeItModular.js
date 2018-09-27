
var mymodule = require('./fileOne')

mymodule(process.argv[2], process.argv[3], function(err, data){
    if(err) return callback(err)
    data.forEach(element => {
        console.log(element)
    });
})



// MODULS
// module.exports = function(process.argv[2])
// fs.readdir(process.argv[2], process.argv[3], function (err, data))
// data =[filtered list of files]
// [2] //DIRECTORY NAME
// [3] // 
// console.log(list of files in a given directory[2] filtere by the extension[3] of the files)

