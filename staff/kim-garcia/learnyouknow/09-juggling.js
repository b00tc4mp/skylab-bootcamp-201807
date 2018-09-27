const http = require('http')
// const bl = require('bl')
// const {argv: [, , ...urls]} = process // es lo mismo q lo de abajo
const urls = [process.argv[2], process.argv[3], process.argv[4]]

let results = []

for(let i=0; i<urls.length; i++){
    http.get(urls[i], (res) => {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => { rawData += chunk })
        res.on('end', () => {
            results[i] = rawData
            rawData = ''
            if(results.length === 3) {
                for(let j = 0; j<results.length; j++){
                    console.log(results[j])
                }
            }
        })
    })
}




