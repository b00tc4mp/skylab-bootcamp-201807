const http = require('http')

let count = 0
let results = []

// http.get(process.argv[2], function (response) {
//     let result = ''
//     response.setEncoding("utf-8");
//     response.on("data", function (data) {
//         results[0] = result += data

//     })
//     response.on('end', () => {
//         count++
//         if (count === 3) {
//             printResults()
//         }
//     })
// });

// http.get(process.argv[3], function (response) {
//     let result = ''
//     response.setEncoding("utf-8");
//     response.on("data", function (data) {
//         results[1] = result += data

//     })
//     response.on('end', () => {
//         count++
//         if (count === 3) {
//             printResults()
//         }
//     })
// });

// http.get(process.argv[4], function (response) {
//     let result = ''
//     response.setEncoding("utf-8");
//     response.on("data", function (data) {
//         results[2] = result += data
//     })
//     response.on('end', () => {
//         count++
//         if (count === 3) {
//             printResults()
//         }
//     })
// });

// function printResults() {
//     for (let index = 0; index < results.length; index++) {
//         console.log(results[index])

//     }

// }


for (let index = 0; index < 3; index++) {
    http.get(process.argv[index+2], function (response) {
        let result = ''
        response.setEncoding("utf-8");
        response.on("data", function (data) {
            results[index] = result += data
        })
        response.on('end', () => {
            count++
            if (count === 3) {
                printResults()
            }
        })
    });   
}

function printResults() {
    for (let index = 0; index < results.length; index++) {
        console.log(results[index])
    }
}
