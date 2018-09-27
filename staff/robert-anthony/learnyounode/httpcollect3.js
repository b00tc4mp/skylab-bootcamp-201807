http = require('http')


let urlsCompleted = 0

const dataStrings = ['','','']

for (let i = 0; i < 3; i++) {
  http.get(process.argv[i+2], res => {

    res.setEncoding('utf8');

    res.on("data", data => {
      dataStrings[i] =  dataStrings[i].concat(data)
    })

    res.on("end", () => {
     if (++urlsCompleted=== 3) {
       for ( line of dataStrings) console.log(line)
     }
    })

  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}