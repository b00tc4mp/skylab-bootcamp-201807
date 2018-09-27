var http = require('http')
var https = require('https')
 
var url = process.argv[2]
var prefix = url.substring(0,8)
 
if (prefix === 'https://'){
  https.get(url, function (response) {
    response.on('data', function (data) {
      console.log(data.toString());
    })
  })
} else {
  http.get(url, function (response) {
    response.on('data', function (data) {
      console.log(data.toString());
    })
  })
}
