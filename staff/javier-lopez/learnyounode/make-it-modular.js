const extfilter = require('./make-it-modular-1')

let dir = process.argv[2]
let ext = process.argv[3]

extfilter(dir,ext,function(err,data){
    if(err) console.log("ERROR: ", err)
    
    data.forEach(element => {
        console.log(element)
    });
})