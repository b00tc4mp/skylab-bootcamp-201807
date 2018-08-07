const http = require('http')
const bl = require('bl')

// $ node juggling-async-recursive.js http://google.es http://google.fr http://google.it http://google.co.uk http://google.com

const { argv: [, , ...urls] } = process

getContent(urls)

function getContent(urls) {
    if (urls.length)
        http.get(urls[0], res => {
            res.pipe(bl((err, content) => {
                if (err) throw err

                console.log(content.toString())

                getContent(urls.slice(1))
            }))
        })
}