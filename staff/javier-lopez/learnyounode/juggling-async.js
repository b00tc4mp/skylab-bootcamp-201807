//Version 1 -- IT WORKS!!!

// const http = require('http')
// let url = process.argv[2]
// let url2 = process.argv[3]
// let url3 = process.argv[4]

// http.get(url, function(response) {
//     let result = ''
//     response.setEncoding("utf-8")
//     response.on("data", function (data) {
//        result+=data
//       })
//     response.on('end',() => {
//         console.log(result)
//     })
//   })
  
//   http.get(url2, function(response) {
//     let result = ''
//     response.setEncoding("utf-8")
//     response.on("data", function (data) {
//        result+=data
//       })
//     response.on('end',() => {
//         console.log(result)
//     })
//   })
  
//   http.get(url3, function(response) {
//     let result = ''
//     response.setEncoding("utf-8")
//     response.on("data", function (data) {
//        result+=data
//       })
//     response.on('end',() => {
//         console.log(result)
//     })
//   })

const http = require('http')


for(var i = 2;i<process.length;i++){
  http.get(process[i], function(res){
    let result=''
    res.setEncoding('utf-8')
    res.on('data', function(data){
      res = res+data
    })
    res.on('end',()=>{
      console.log(result)
    })
  })
}