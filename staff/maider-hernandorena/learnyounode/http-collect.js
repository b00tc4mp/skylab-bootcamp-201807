//instalando bl
// const http = require('http')
// const bl = require('bl')

// const url = process.argv[2]

// http.get(url, function callback(response){
//     response.pipe(bl(function(err, data){
//         if(err) throw new Error(err)
//         console.log(data.toString().length)
//         console.log(data.toString())
//     }))
// })


//instalando bl (mejorado)
const http = require('http')
const bl = require('bl')

const { argv: [, , url] } = process

http.get(url, response => {
    response.pipe(bl((err, data) => {
        if(err) throw err
        console.log(data.length)
        console.log(data.toString())
    }))
})


//el metodo crudo
// const http = require('http')

// const { argv: [, , url] } = process

// http.get(url, response => {
//     response.setEncoding('utf8')

//     let content = ''
//     response.on('data', data => { content += data })

//     response.on('end', () => {
//         console.log(content.length)
//         console.log(content)
//     })
// })