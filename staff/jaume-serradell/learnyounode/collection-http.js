var http = require('http');

// const url = process.argv[2];
const { argv:[, , url] } = process

http.get(url, function(response) {
    let info = '';
    
    response.setEncoding('utf8');
    response.on('data', function(data){
        info += data;
    })

    response.on('end', function(){
        console.log(info.length);
        console.log(info)
    })
})