http = require('http')
url = require('url')


const server = http.createServer((req,res) => {

  const parseURL = "/api/parsetime"
  const unixURL = "/api/unixtime"

  const parsedURL = url.parse(req.url)
  const query =parsedURL.query.toString().split("=")[1];
  console.log(query)
  const date = new Date(query)
  res.writeHead(200, { 'Content-Type': 'application/json' })

  if (parsedURL.pathname === parseURL ) {

    const data = {
      "hour":date.getHours(),
      "minute":date.getMinutes(),
      "second":date.getSeconds(),
    }
    const dataString = JSON.stringify(data)
    res.end(dataString)

  } else if (parsedURL.pathname === unixURL)
  {
    const data = {"unixtime":date.getTime()}
    const dataString = JSON.stringify(data)
    res.end(dataString)
  }
  else{
    // ¿¿¿
  }




})
server.listen(process.argv[2])