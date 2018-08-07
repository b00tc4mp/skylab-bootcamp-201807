// const filterFn = require('./6-2.js')
// const dir = process.argv[2]
// const filterStr = process.argv[3]

// filterFn(dir, filterStr, function (err, list) {
//   if (err) {
//     return console.error('There was an error:', err)
//   }

//   list.forEach(function (file) {
//     console.log(file)
//   })
// })

const filter = require('./6-2.js')

filterByExt(process.argv[2],process.argv[3], function cb (err,data){
    if(err) return console.err(err)
    if(data) {
        data.forEach(function(element) {
          console.log(element);
        });
    }
})