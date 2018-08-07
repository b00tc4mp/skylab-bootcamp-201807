var http = require('http');

const { argv: [, , url] } = process

http.get(url, function(response){
    response.setEncoding('utf8');
    response.on('data', function(data){
        console.log(data);
    })
})