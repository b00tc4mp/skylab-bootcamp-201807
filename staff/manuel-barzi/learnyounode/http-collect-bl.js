const http = require('http')
const bl = require('bl')

const { argv: [, , url] } = process

http.get(url, res => {
    res.pipe(bl((err, content) => {
        if (err) throw err

        console.log(content.length)
    
        console.log(content.toString())
    }))
})