const fs = require('fs')

function rmDirRecursiveSync(folder) {
    const files = fs.readdirSync(folder)

    files.forEach(file => {
        const path = `${folder}/${file}`

        if (fs.lstatSync(path).isDirectory())
            rmDirRecursiveSync(path)
        else
            fs.unlinkSync(path)
    })

    fs.rmdirSync(folder)
}

module.exports = rmDirRecursiveSync