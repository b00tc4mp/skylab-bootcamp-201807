var http = require('http')

http.get(process.argv[2], (res) => { // Response = node stream object
    res.setEncoding('utf8')
    res.on('data', function(data){
        console.log(data)
    })
})

//OFFICIAL SOLUCTION:
// var http = require('http')

// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8')
//   response.on('data', console.log)
//   response.on('error', console.error)
// }).on('error', console.error)