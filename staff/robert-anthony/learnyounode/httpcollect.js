http = require('http')


http.get(process.argv[2],res => {


  res.setEncoding('utf8');

  let dataString = ''

  res.on("data",data =>  dataString = dataString.concat(data))


  res.on("end",() =>{
    console.log(dataString.length);
    console.log(dataString);
  })


}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});