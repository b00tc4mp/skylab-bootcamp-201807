const http = require('http')
const bl = require('bl')
const async = require('async')

// $ node juggling-async-async.js http://google.es http://google.fr http://google.it http://google.co.uk http://google.com

const { argv: [, , ...urls] } = process

async.map(urls, (url, cb) => {
    http.get(url, res => {
        res.pipe(bl((err, content) => {
            if (err) return cb(err)

            cb(undefined, content.toString())
        }))
    })
}, (err, results) => {
    if (err) throw err

    results.forEach(result => console.log(result))
})