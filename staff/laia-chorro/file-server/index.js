const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())
app.use(express.static('public'))

const errors = {
    EMPTY_FILE: 'cannot upload emty files'
}

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
    const { query: {error} } = req
    const files = fs.readdirSync('files')
    const errorMessage = error[error]

    res.send(`<html>
    <head>
        <title>files</title>
        <link rel="stylesheet" href="./styles.css">
    </head>
    <body>
        <ul> 
            ${files.map(file => `<li><a href="/download?name=${file}">${file}</a></li><a href="/delete?name=${file}"><button>DELETE</button></a>`).join('')}
        </ul>

        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button>upload</button>
        </form>
        ${errorMessage ? `<h2 class="error">${errorMessage}</h2>` : ''}
    </body>
</html>`)
})

app.post('/files', (req, res) => {
    const { files: { upload } } = req

    if (upload) {
        upload.mv(`files/${upload.name}`, function (err) {
            if (err)
                return res.status(500).send(err)
    
            res.redirect('/files')
        })
    } else {
        res.redirect(`/files?error=${EMPTY_FILE}`)
    }
})

app.get('/download', function(req, res){
    var file = `files/${req.query.name}`
    res.download(file); // Set disposition and send it.
  });

  app.get('/delete', function(req, res) {
    var file = `files/${req.query.name}`

    fs.unlinkSync(file, function (err) {            
        if (err) {                                                
            console.error(err);                                    
        }                                                          
       console.log('File has been Deleted'); 
                            
    });
    res.redirect('/files')    

});

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))