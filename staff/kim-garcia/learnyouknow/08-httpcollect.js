// var bl = require('bl')
var http = require('http')


http.get(process.argv[2], (res) => {// [2]url
    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => {rawData += chunk})
    res.on('end', () => {
        console.log(rawData.length)
        console.log(rawData)
    })
})

// CON EL BL
    // res.pipe(bl(function(err, data){
    //     if(err) throw err;
    //     data = data.toString()
    //     console.log(data.length)
    //     console.log(data)
    // }))


// http.get(process.argv[2], (res) => { // Response = node stream object
//     res.setEncoding('utf8')
//     res.on('data', function(data){
//         console.log(data)
//     })
// })
