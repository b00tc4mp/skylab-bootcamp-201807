const http = require('http'),
  url = require('url')

const [, , port] = process.argv

http.createServer((request, response) => {

  if (request.method === 'GET') {

    const myUrl = url.parse(request.url, true)

    if (myUrl.pathname === '/api/parsetime') {
      // const iso = myUrl.query.iso
      
        
        console.log('pepe')
        // write back something interesting to the user:
        // const data = JSON.parse({
        //   'hour': 14,
        //   'minute': 23,
        //   'second': 15,
        // })
        response.write('pepe');
        response.end();  
    }
    // else if (myUrl.pathname === '/api/unixtime') {

    // }



    // console.log(request.url)
    // console.log(url.parse(request.url, true))
    // Url {
    // protocol: null,
    // slashes: null,
    // auth: null,
    // host: null,
    // port: null,
    // hostname: null,
    // hash: null,
    // search: '?iso=2018-08-07T13:31:07.127Z',
    // query: { iso: '2018-08-07T13:31:07.127Z' },
    // pathname: '/api/parsetime',
    // path: '/api/parsetime?iso=2018-08-07T13:31:07.127Z',
    // href: '/api/parsetime?iso=2018-08-07T13:31:07.127Z' }

  }

}).listen(port)