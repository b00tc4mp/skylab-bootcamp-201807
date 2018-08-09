const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())

app.use(express.static('public'))

//Pag hello world
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

// vista files
app.get('/files', (req, res) => {
    const files = fs.readdirSync('files')
    const { query : {error} } = req

    res.cookie('hello', 'world')

    res.send(`<html>
    <head>
        <title>files</title>
        <link rel="stylesheet" href="styles.css"/>
        <link href="https://www.skylabcoders.com/skylab-coders-academy_408.png" type="image/png" rel="Shortcut icon"
    </head>
    <body>
        <ul>
            ${files.map(file => `<li><a href="/files/download/${file}">${file}</a></li><a href="/files/delete/${file}">&nbspDelete</a></li>`).join('')}
        </ul>
        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button>upload</button>
        </form>
        ${error ? `<h2 class='error'>${error}</h2>`: ''}
    </body>
</html>`)
})

// GET para el download
app.get('/files/download/:fileName', function(req, res){

    res.set('Content-type', 'file'); 
    const {fileName} = req.params
    const filePath = `${__dirname}/files/${fileName}`; 
    res.download(filePath);
    res.redirect('/files')
  });

// GET para el delete
app.get('/files/delete/:fileName', function(req, res){

    // res.set('Content-type', 'file');
     const {fileName} = req.params
     const filePath = `${__dirname}/files/${fileName}`; 
     fs.unlinkSync(filePath);
     res.redirect('/files')
   });

// POST para hacer el upload
app.post('/files', (req, res) => {
    const { files: { upload } } = req

    if (upload)
    upload.mv(`files/${upload.name}`, function (err) {
        if (err)
            return res.status(500).send(err)
        res.redirect('/files')
    })
    else 
       // res.status(510).send('<html><body><p>cannot upload empty fiels</p></body></html>')
       res.redirect('/files?error=cannot upload empty files')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))