const express = require('express')
const fileUpload = require('express-fileupload')
const package = require('./package.json')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.set('view engine', 'pug')

app.use(fileUpload())
app.use(express.static('public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        //secure: true // WARN! in case requiring it to work in https only
    },
    store: new FileStore
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const { session } = req

    delete session.registerError
    delete session.loginError

    try {
        if (session.username) {
            return res.redirect('/files')
        }
    } catch (err) {
        delete session.username
    }

    res.render('index')
})

app.get('/files', (req, res) => {
    const { session } = req

    try {
        if (session.username) {
            const files = logic.listFiles(session.username)

            res.render('files', { files })
        } else {
            res.redirect('/')
        }
    } catch ({ message }) {
        res.redirect('/')
    }
})

app.post('/files', (req, res) => {
    const { session, files: { upload } } = req

    if (upload) {
        try {
            logic.saveFile(session.username, upload.name, upload.data)
        } catch ({ message }) {
            session.error = message
        }

        res.redirect('/files')
    } else {
        res.redirect('/files')
    }
})

app.get('/register', (req, res) => {
    const { session } = req

    delete session.loginError

    try {
        if (session.username) {
            return res.redirect('/files')
        }
    } catch ({message}) {
        delete session.username

        session.registerError = message
    }

    res.render('register', { session })
})

app.post('/register', (req, res) => {
    const { session, body: { username, password } } = req

    try {
        logic.register(username, password)

        res.send(`<html>
            <head>
                <title>files</title>
                <link href="styles.css" rel="stylesheet">
                <link href="skylab-icon.png" type="image/png" rel="Shortcut Icon">
            </head>
            <body>
                ok, user ${username} successfully registered, now you can go to <a href="/login">login</a>
            </body>
        </html>`)
    } catch ({ message }) {
        session.registerError = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const { session } = req

    delete session.registerError

    try {
        if (session.username) {
            return res.redirect('/files')
        }
    } catch (err) {
        delete session.username
    }

    res.render('login', { session })
})

app.post('/login', (req, res) => {
    const { session, body: { username, password } } = req

    try {
        logic.authenticate(username, password)

        session.username = username

        res.redirect('/files')
    } catch ({ message }) {
        session.loginError = message

        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    const { session } = req

    delete session.loginError

    try {
        delete session.username
    } catch (err) {
        // noop
    }

    res.redirect('/')
})

app.get('/download/:file', (req, res) => {
    const { session, params: { file } } = req

    res.download(logic.getFilePath(session.username, file))
})

app.get('/delete/:file', (req, res) => {
    const { session, params: { file } } = req

    try {
        logic.removeFile(session.username, file)
    } catch ({ message }) {
        // TODO
    }

    res.redirect('/files')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))