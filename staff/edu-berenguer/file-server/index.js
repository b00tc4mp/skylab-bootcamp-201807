const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())

app.use(express.static('public'))

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
    const { query: { error } } = req
    const files = fs.readdirSync('files')
    // const errorMessage = errors[error]

    res.send(`<html>
    <head>
        <title>files</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <ul>
            ${files.map(file => `<a href="download/${file}"><li>${file}</li></a><a href="delete/${file}"><button>delete</button></a>`).join('')}
        </ul>

        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button>upload</button>
        </form>

        ${error? `<h2 class="error">${error}</h2>`  : '' }
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
    }
    res.redirect('/files?error=Cannot upload empty files')
    // res.status(500).send('<html><body><p>Cannot upload empty files</p></body></html>nodemo')

})
 
app.get('/download/:file',(req, res) => {
  var file = `files/${req.params.file}`
  res.download(file)
});

app.get('/delete/:file',(req, res) => {
     var file = `files/${req.params.file}`
    fs.unlinkSync(file)
    res.redirect('/files')
  });

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))