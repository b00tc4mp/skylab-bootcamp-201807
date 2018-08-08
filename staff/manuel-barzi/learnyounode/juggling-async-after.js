const http = require('http')
const bl = require('bl')
const after = require('after')

// $ node juggling-async-after.js http://google.es http://google.fr http://google.it http://google.co.uk http://google.com

const { argv: [, , ...urls] } = process

const next = after(urls.length, (err, contents) => {
    if (err) throw err

    contents.forEach(content => console.log(content))
})

const contents = []

urls.forEach((url, index) => {
    http.get(url, res => {
        res.pipe(bl((err, content) => {
            if (err) return next(err)

            contents[index] = content.toString()

            next(undefined, contents)
        }))
    })
})