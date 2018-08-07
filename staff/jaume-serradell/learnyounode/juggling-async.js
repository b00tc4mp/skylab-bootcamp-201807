const http = require('http');

// const url = process.argv[2];
// const url2 = process.argv[3];
// const url3 = process.argv[4];

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


// http.get(url, function(response) {
//     let info = '';
    
//     response.setEncoding('utf8');
//     response.on('data', function(data){
//         result[0] = info += data;
//     })

//     response.on('end', function(){
//         count++
//         if(count === 3) {
//             print();
//         }
//     })
// })

// http.get(url2, function(response) {
//     let info = '';
    
//     response.setEncoding('utf8');
//     response.on('data', function(data){
//         result[1] = info += data;
//     })

//     response.on('end', function(){
//         count++
//         if(count === 3) {
//             print();
//         }
//     })
// })

// http.get(url3, function(response) {
//     let info = '';
    
//     response.setEncoding('utf8');
//     response.on('data', function(data){
//         result[2] = info += data;
//     })

//     response.on('end', function(){
//         count++
//         if(count === 3) {
//             print();
//         }
//     })
// })


