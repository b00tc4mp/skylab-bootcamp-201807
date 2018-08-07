var http = require('http');

// const url = process.argv[2]
// const url1 = process.argv[3]
// const url2 = process.argv[4]

let result = []
let count = 0;

for (let i = 0; i < 3; i++) {
   http.get(process.argv[i+2],function(response){
       let res = '';
       response.setEncoding('utf8')
   
       response.on('data', function (chunk) {
           result[i] = res += chunk;
       });
       response.on('end', function () {
           count++;
           if(count === 3){
               print()
           }
       });
   });  
}

function print(){
   for (let i = 0; i < result.length; i++) {
       console.log(result[i]);    
   }
}

// http.get(url,function(response){
//     let res = '';
//     response.setEncoding('utf8')
 
//     response.on('data', function (chunk) {
//         result[0] = res += chunk;
//     });
//     response.on('end', function () {
//         count++;
//         if(count === 3){
//             print()
//         }
//     });
// });

// http.get(url1,function(response){
//     let res = '';
//     response.setEncoding('utf8')
 
//     response.on('data', function (chunk) {
//         result[1] = res += chunk;
//     });
//     response.on('end', function () {
//         count++;
//         if(count === 3){
//             print()
//         }
//     });
// });

// http.get(url2,function(response){
//     let res = '';
//     response.setEncoding('utf8')
 
//     response.on('data', function (chunk) {
//         result[2] = res += chunk;
//     });
//     response.on('end', function () {
//         count++;
//         if(count === 3){
//             print()
//         }
//     });
// });