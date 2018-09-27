/*
 Write a program that performs an HTTP GET request to a URL provided to you  
  as the first command-line argument. Write the String contents of each  
  "data" event from the response to a new line on the console (stdout). 
*/
var http = require('http')

var url = process.argv[2];
http.get(url, function (response) {
    response.on("data", function (data) { console.log(data) }).setEncoding('utf8')
    response.on("error", function (error) { console.error(error) })
} )



/*
var http = require('http')
    
    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)

*/