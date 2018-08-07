const http = require('http')
const bl = require('bl')

// $ node juggling-async.js http://google.es http://google.fr http://google.it http://google.co.uk http://google.com

const { argv: [, , ...urls] } = process

// const start = Date.now()
const contents = []
let count = 0

urls.forEach((url, index) => {
    http.get(url, res => {
        res.pipe(bl((err, content) => {
            if (err) throw err
    
            contents[index] = content.toString()

            if(++count === urls.length) {
                contents.forEach(content => console.log(content))

                // console.log(`${Date.now() - start}ms`)
            }
        }))
    })
})