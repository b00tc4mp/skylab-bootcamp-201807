const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express();

// 
app.use(fileUpload());

//statis es un midlewire que permite acceder a una carpeta al nivel d index
app.use(express.static('public')); // para añadir styles.css, luego lo añadimos en head

app.get('/helloworld', (req, res) => {
    res.send(`<html>
    <head>
        <title>hola mundo</title>
        <link rel="stylesheet" href"styles.css"></link>
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
            ${files.map(file => `<li><a href="/download/${file}"> ${file}</a> <button> <a href="/delete/${file}"> X</a></button></li>`).join('')}
        </ul>

        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button>upload</button>
        </form>
    </body>
</html>`)
})

app.get('/delete/:file', (req, res) => {
    const fileDelete = 'files/' + req.params.file; // selecciona arxiu
    console.log(req.params)
    fs.unlinkSync(fileDelete)  //delate
    res.redirect('/files') // recargues tot , torna a fer el get
})

app.get('/download/:file', (req, res) => {
    const filesDown = 'files/' + req.params.file;

    res.download(filesDown);
})

app.post('/files', (req, res) => {
    console.log(req)
    console.log(res)
    const { files: { upload } } = res
    const { }

    if(upload)
        upload.mv(`files/${upload.name}`, function (err) {
            if (err)
                return res.status(500).send(err)

            res.redirect('/files')
        })
    else 
        res 
})




app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))
//file-server 1.0.0 up and running on port 8080  
//|| 8080