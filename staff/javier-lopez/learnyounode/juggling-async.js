const http = require('http')
let results = []
let count = 0

for (let i = 0; i < 3; i++) {
  http.get(process.argv[i+2], function (res) {
    let result = ''
    res.setEncoding('utf-8')
    res.on('data', function (data) {
      result += data
    })
    res.on('end', () => {
      results[i] = result
      count ++
      if (count === 3) {
        printSolution()
      }
    })
  })
}

function printSolution(){
  for (let j = 0; j < count; j++) {
    console.log(results[j])
  }

}

//Version 2 -- IT WORKS!!!

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
