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
    secret: 'zer ote da',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new FileStore
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send(`<html>
                <head>
                    <title>files</title>
                </head>
                <body>
                    <h1>Welcome to files!</h1>
                    <p>Please, <a href="/register">Register</a> or <a href="/login">Login</a> to continue to your files.</p>
                </body>
            </html>`)
})

app.get('/register', (req, res) => {
    const { session: { error } } = req
    res.send(`<html>
                <head>
                    <title>files</title>
                    <link rel="stylesheet" href="/styles.css"/>
                    <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                </head>
                <body>
                    <h1>Register</h1>
                    <form action="/register" method="post">
                        <input type="text" name="username" placeholder="Username">
                        <input type="password" name="password" placeholder="Password">
                        <button type="submit">Register</button>
                    </form>
                    ${error ? `<p class="error">${error}</p>` : ''}
                    <p>Go to <a href="/login">Login</a></p>
                </body>
            </html>`)
})

app.post('/register', (req, res) => {
    const { session, body: { username, password } } = req

    try {
        logic.register(username, password)
        res.send(`<html>
                    <head>
                        <title>files</title>
                        <link rel="stylesheet" href="/styles.css"/>
                        <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                    </head>
                    <body>
                        <p>User ${username} successfully registered! Now you can go to <a href="/login">Login</a></p>
                    </body>
                </html>`)
    } catch ({ message }) {
        session.error = message
        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const { session: { error } } = req
    res.send(`<html>
                <head>
                    <title>files</title>
                    <link rel="stylesheet" href="/styles.css"/>
                    <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                </head>
                <body>
                    <h1>Login</h1>
                    <form action="/login" method="post">
                        <input type="text" name="username" placeholder="Username">
                        <input type="password" name="password" placeholder="Password">
                        <button type="submit">Login</button>
                    </form>
                    ${error ? `<p class="error">${error}</p>` : ''}
                    <p>Go to <a href="/register">Register</a></p>
                </body>
            </html>`)
})

app.post('/login', (req, res) => {
    const { session, body: { username, password } } = req

    try {
        logic.login(username, password)
        session.username = username
        res.redirect('/files')
    } catch({ message }) {
        session.error = message
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    const { session } = req

    try {
        logic.logout(session.username)
        res.redirect('/')
    } catch({ message }) {
        session.error = message
        res.redirect('/files')
    }
})

app.get('/files', (req, res) => {
    const { session } = req

    try {
        if (logic.isLoggedIn(session.username)) {
                const files = fs.readdirSync('files')
                res.send(`<html>
                            <head>
                                <title>files</title>
                                <link rel="stylesheet" href="/styles.css"/>
                                <link rel="Shortcut Icon" href="/logo.png" type="image/png">
                            </head>
                            <body>
                                <nav>
                                    <a href="/logout">Logout</a>
                                </nav>
                                <ul>
                                    ${files.map(file => `<li><a href="downloads/${file}">${file}</a><a href="deleted/${file}"><p>X</p></a></li>`).join('')}
                                </ul>
                                <form action="/files" method="post" encType="multipart/form-data">
                                    <input type="file" name="upload">
                                    <button>Upload</button>
                                </form>
                            </body>
                        </html>`)
        } else {
            res.redirect('/')
        }
    } catch ({ message }) {
        session.error = message
        res.redirect('/')
    }
})

app.post('/files', (req, res) => {
    const { session, files: { upload } } = req

    if (upload) {
        session.error = ''
        upload.mv(`files/${upload.name}`, (err) => {
            if (err)
                return res.status(500).send(err)

            res.redirect('/files')
        })
    } else {
        session.error = message
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


app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))