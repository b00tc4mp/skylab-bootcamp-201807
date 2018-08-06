fileLister = require('./fileListModule')


function results(err,data) {
  if (err) console.log("There was an error:",err);
  else console.log(data.join("\n"))
}

fileLister(process.argv[2],process.argv[3],results)