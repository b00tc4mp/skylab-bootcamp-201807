const http = require('http')

http.get(process.argv[2], function(response) {
    let result = ''
    response.setEncoding("utf-8");
    response.on("data", function (data) {
       result+=data
      })
    response.on('end',() => {
        console.log(result.length)
        console.log(result)
    })
  });