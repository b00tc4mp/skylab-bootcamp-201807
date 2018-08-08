const http = require('http')
const bl = require('bl')

// $ node juggling-async-promised.js http://google.es http://google.fr http://google.it http://google.co.uk http://google.com
const { argv: [, , ...urls] } = process

// const start = Date.now()

const requests = urls.map(url =>
    new Promise((resolve, reject) => {
        http.get(url, res => {
            res.pipe(bl((err, content) => {
                if (err) return reject(err)

                resolve(content.toString())
            }))
        })
    })
)

Promise.all(requests)
    .then(contents => {
        contents.forEach(content => console.log(content))

        // console.log(`${Date.now() - start}ms`)
    })