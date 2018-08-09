const fs = require('fs')
const express = require('express')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')
const package = require('./package.json')
const morgan = require('morgan')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new FileStore
}))
app.use(bodyParser.urlencoded({ extended: false }))

const errors = {
    emptyFile: 'cannot upload an empty file'
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
    const files = fs.readdirSync('files')
    let errorMessage
    const { session } = req

    if (logic.isLoggedIn(session.username)) {
        if (session.error) errorMessage = errors[session.error]
            res.send(`<html>
                        <head>
                            <title>files</title>
                            <link rel="stylesheet" href="/styles.css"/>
                            <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                        </head>
                        <body>
                            <ul>
                                ${files.map(file => `<li><a href="downloads/${file}">${file}</a><a href="deleted/${file}"><p>X</p></a></li>`).join('')}
                            </ul>

                            <form action="/files" method="post" encType="multipart/form-data">
                                <input type="file" name="upload">
                                <button>UPLOAD</button>
                            </form>

                            ${errorMessage ? `<h2 class="error">${errorMessage}</h2>` : ''}
                        </body>
                    </html>`)
    } else {
        res.send(`<html>
                    <head>
                        <title>files</title>
                        <link rel="stylesheet" href="/styles.css"/>
                        <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                        </head>
                    <body>
                        <p>please, proceed to login to access files</p>
                    </body>
                </html>`)
    }
})

app.post('/files', (req, res) => {
    const { files: { upload }, session } = req

    if (upload) {
        session.error = ''
        upload.mv(`files/${upload.name}`, (err) => {
            if (err)
                return res.status(500).send(err)

            res.redirect('/files')
        })
    } else {
        session.error = 'emptyFile'
        res.redirect('/files')
    }
})

app.get('/downloads/:file', (req, res) => {
    const file = `files/${req.params.file}`
    res.download(file)
})

app.get('/deleted/:file', (req, res) => {
    const fileToDelete = `files/${req.params.file}`
    fs.unlinkSync(fileToDelete)
    res.redirect('/files')
})

app.get('/register', (req, res) => {
    res.send(`<html>
                <head>
                    <title>files</title>
                    <link rel="stylesheet" href="/styles.css"/>
                    <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                </head>
                <body>
                    <h1>register</h1>
                    <form action="/register" method="post">
                        <input type="text" name="username">
                        <input type="password" name="password">
                        <button type="submit">register</button>
                    </form>
                </body>
            </html>`)
})

app.post('/register', (req, res) => {
    const { body: { username, password } } = req

    try {
        logic.register(username, password)

        res.send(`<html>
                    <head>
                        <title>files</title>
                        <link rel="stylesheet" href="/styles.css"/>
                        <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                    </head>
                    <body>
                        <h1>ok, user ${username} successfully registered</h1>
                    </body>
                </html>`)
    } catch ({message}) {
        res.send(`<html>
                    <head>
                        <title>files</title>
                        <link rel="stylesheet" href="/styles.css"/>
                        <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                    </head>
                    <body>
                        <h1>Error: ${message}</h1>
                    </body>
                </html>`)
    }
})

app.get('/login', (req, res) => {
    res.send(`<html>
                <head>
                    <title>files</title>
                    <link rel="stylesheet" href="/styles.css"/>
                    <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                </head>
                <body>
                    <h1>login</h1>

                    <form action="/login" method="post">
                        <input type="text" name="username">
                        <input type="password" name="password">
                        <button type="submit">login</button>
                    </form>
                </body>
            </html>`)
})

app.post('/login', (req, res) => {
    const { body: { username, password }, session } = req

    logic.login(username, password)
    session.username = username

    res.send(`<html>
                <head>
                    <title>files</title>
                    <link rel="stylesheet" href="/styles.css"/>
                    <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                </head>
                <body>
                    <h1>${logic.isLoggedIn(session.username) ? `ok, user ${username} successfully logged in` : `ko, user ${username} failed to log in`}</h1>
                </body>
            </html>`)
})


app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))