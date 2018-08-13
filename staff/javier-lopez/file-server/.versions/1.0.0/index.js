const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())

app.get('/helloworld', (req, res) => {
    res.send(`<html>
    <head>
        <title>hola mundo</title>
    </head>
    <body>
        <h1>hello world!</h1>
    </body>
</html>`)
})

app.get('/files', (req, res) => {
    const files = fs.readdirSync('files')

    res.send(`<html>
    <head>
        <title>files</title>
    </head>
    <body>
        <ul>
            ${files.map(file => `<li> <a href="/files/${file}" >${file}</a> <a href='/delete/${file}'>Delete</a> </li> `).join('')}
        </ul>

        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button>upload</button>
        </form>
    </body>
</html>`)
})

app.post('/files', (req, res) => {
    const { files: { upload } } = req

    if(upload){
        upload.mv(`files/${upload.name}`, function (err) {
            if (err)
                return res.status(500).send(err)
    
            res.redirect('/files')
        });
    }else // res.status(500).send("<html><body><p>You didn't select any file, bro</p></body></html>")
        res.redirect('/files')
})

app.get('/files/:file', (req, res) =>{
    const {params: {file}} = req
     res.download(`files/${file}`)

})

app.get('/delete/:file', (req, res) =>{
    const {params: {file}} = req
    fs.unlinkSync(`files/${file}`)
    res.redirect('/files')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))