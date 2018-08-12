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
    },
    store: new FileStore
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const { session } = req

    session.registerError = ''
    session.loginError = ''

    try {
        if (logic.isLoggedIn(session.username)) {
            return res.redirect('/files')
        }
    } catch (err) {
        delete session.username
    }

    res.render('landing')
})

app.get('/files', (req, res) => {
    const { session } = req

    try {
        if (logic.isLoggedIn(session.username)) {
            const files = logic.listFiles(session.username)
            res.render('files', { session, files })
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

    session.loginError = ''

    try {
        if (logic.isLoggedIn(session.username)) {
            return res.redirect('/files')
        }
    } catch (err) {
        delete session.username
    }

    res.render('register', { session })
})

app.post('/register', (req, res) => {
    const { session, body: { username, password } } = req

    try {
        logic.register(username, password)

        res.render('goToLogin', {username})
    } catch ({ message }) {
        session.registerError = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const { session } = req

    session.registerError = ''

    try {
        if (logic.isLoggedIn(session.username)) {
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
        logic.login(username, password)

        session.username = username

        res.redirect('/files')
    } catch ({ message }) {
        session.loginError = message

        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    const { session } = req

    session.loginError = ''

    try {
        logic.logout(session.username)
    } catch ({ message }) {
        session.loginError = message
        res.redirect('/files')
    }

    res.redirect('/')
})

// app.get('/profile', (req, res) => {
//     const { session: {username} } = req
//     res.render('profile', {username})
// })

app.get('/profile', (req, res) => {
    const { session } = req

    try {
        if (logic.isLoggedIn(session.username)) {
            res.render('profile', { session })
        }
    } catch (err) {
        delete session.username
    }
})

app.post('/profile', (req, res) => {
    const { session, body: { password, newPassword } } = req

    try {
        logic.updateUser(session.username, password, newPassword)
        res.redirect("/files")
    } catch ({ message }) {
        session.updateError = message
        res.redirect('/profile')
    }
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
        session.loginError = message
        res.redirect('/files')
    }

    res.redirect('/files')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))