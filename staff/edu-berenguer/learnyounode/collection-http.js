var http = require('http');

const url = process.argv[2]

http.get(url,function(response){
    let res = '';
    response.setEncoding("utf8")
   
    response.on("data", function (data) {
        res += data;
    });
    response.on("end", function () {
        console.log(res.length)
        console.log(res);
        
    });
});
