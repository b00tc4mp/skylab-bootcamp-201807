const http = require('http')

const [, , url1, url2, url3] = process.argv

http.get(url1, res => {

  res.setEncoding('utf8')
  let rawData1 = ''
  res.on('data', chunk => { rawData1 += chunk })
  res.on('end', () => {
    
    http.get(url2, res => {
      res.setEncoding('utf8')
      let rawData2 = ''
      res.on('data', chunk => { rawData2 += chunk })
      res.on('end', () => {
        
        http.get(url3, res => {
          res.setEncoding('utf8')
          let rawData3 = ''
          res.on('data', chunk => { rawData3 += chunk })
          res.on('end', () => {
            console.log(rawData1)
            console.log(rawData2)
            console.log(rawData3)
          })
        })

      })
    })

  })
})