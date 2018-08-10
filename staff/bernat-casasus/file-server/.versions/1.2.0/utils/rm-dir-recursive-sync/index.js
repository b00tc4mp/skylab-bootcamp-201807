const fs = require('fs')

function rmDirRecursiveSync(folder) {
    const files = fs.readdirSync(folder)

    files.forEach(file => {
        const path = `${folder}/${file}`

        if (fs.lstatSync(path).isDirectory()) {
            rmDirRecursiveSync(path)
        } else if (fs.lstatSync(path).isFile()) {
            fs.unlinkSync(path)
        // } else {
        //     fs.rmdirSync(path)
        }

    })

    fs.rmdirSync(folder)
}

module.exports = rmDirRecursiveSync