const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

//MIDDLEWARES
app.use(fileUpload())
app.use(morgan("dev"))


//ROUTES
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
            ${files.map(file => `<li><a href='/download/${file}'>${file}</a> <a href='/delete/${file}'>Delete</a></li>`).join('')}
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
    if(upload)
    upload.mv(`files/${upload.name}`, function (err) {
        if (err)
            return res.status(500).send(err)
       
       
       
            res.redirect(`/files`)
    });
    else
        res.status(500).send('<html><body><p>cannot upload empty files</p></body></html>')
})

app.get('/download/:file', function(req, res){
    const {params:{file}} = req
    res.download(`${__dirname}/files/${file}`)
  });

app.get('/delete/:file', function (req, res) {
    const {params:{file}} = req
    fs.unlinkSync(`${__dirname}/files/${file}`)
    res.redirect(`/files`)
});

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))