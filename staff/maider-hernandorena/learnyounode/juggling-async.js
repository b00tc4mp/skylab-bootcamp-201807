// const http = require('http')
// const url = process.argv.slice(2)

// let res1 = ""
// let res2 = ""
// let res3 = ""

// http.get(url[0],function callback(response) {
//     response.on("data", (data) => {res1+=data})
//     response.on("end", () => {
//         http.get(url[1],function callback(response) {
//             response.on('data', (data) => {res2+=data})
//             response.on('end', () => {
//                 http.get(url[2], function callback(response) {
//                     response.on('data', (data) => {res3+=data})
//                     response.on('end', () => {
//                         console.log(res1)
//                         console.log(res2)
//                         console.log(res3)
//                     })
//                 })
//             })
//         })
//     })
// })


const http = require('http')
const bl = require('bl')

const { argv: [, , ...urls] } = process

const contents = []
let count = 0

urls.forEach((url, index) => {
    http.get(url, response => {
        response.pipe(bl((err, data) => {
            if(err) throw err
            contents[index] = data.toString() 
            if(++count === urls.length) contents.forEach(data => console.log(data))
        }))
    })
})