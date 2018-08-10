const fs = require('fs')

function rmDirRecursiveSync(folder) {

  const files = fs.readdirSync(folder)

  files.forEach((file, i) => {
    const path = `${folder}/${file}`
    if (fs.lstatSync(path).isDirectory()) rmDirRecursiveSync(path)
    else
      fs.unlinkSync(path)


  })
  console.error("exited for each, about to remove directory", folder)

  fs.rmdirSync(folder)
}

module.exports = rmDirRecursiveSync