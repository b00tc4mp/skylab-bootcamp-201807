const http = require('http');

const result = [];
let count = 0;


function print() {
    for(var i = 0; i<result.length; i++) {
        console.log(result[i])
    }
}


for (let i=0; i<3; i++) {

    http.get(process.argv[i+2], function(response) {
        let info = '';
        
        response.setEncoding('utf8');
        response.on('data', function(data){
            result[i] = info += data;
        })
        
        response.on('end', function(){
            count++
            if(count === 3) {
                print();
            }
        })
    })
}