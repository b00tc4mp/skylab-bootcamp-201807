const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')
const session = require('express-session')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())
app.use(express.static('public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000,
        //secure: true // WARN! in case requiring it to work in https only
    }
  }))

const errors = {
    EMPTY_FILE: 'cannot upload empty files'
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
    //const { query: { error } } = req
    const files = fs.readdirSync('files')

    let errorMessage

    const { session } = req

    if (session.error) errorMessage = errors[session.error]

    res.send(`<html>
    <head>
        <title>files</title>
        <link href="styles.css" rel="stylesheet">
        <link href="skylab-icon.png" type="image/png" rel="Shortcut Icon">
    </head>
    <body>
        <ul>
            ${files.map(file => `<li>${file}</li>`).join('')}
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
    const { files: { upload }, session } = req

    if (upload) {
        session.error = ''

        upload.mv(`files/${upload.name}`, function (err) {
            if (err)
                return res.status(500).send(err)

            res.redirect('/files')
        })
        // else
        //     res.redirect('/files?error=EMPTY_FILE')
    } else {
        session.error = 'EMPTY_FILE'

        res.redirect('/files')
    }
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))