const express = require('express')
const fileUpload = require('express-fileupload')
const package = require('./package.json')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')

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

    res.send(`<html>
    <head>
        <title>files</title>
    </head>
    <body>
        <h1>welcome to files!</h1>
        please, <a href="/register">register</a> or <a href="/login">login</a>.
    </body>
</html>`)
})

app.get('/files', (req, res) => {
    const { session } = req

    try {
        if (logic.isLoggedIn(session.username)) {
            const files = logic.listFiles(session.username)

            res.send(`<html>
    <head>
        <title>files</title>
        <link href="styles.css" rel="stylesheet">
        <link href="skylab-icon.png" type="image/png" rel="Shortcut Icon">
    </head>
    <body>
        <nav>${session.username} <a href="/logout">logout</a></nav>
        <ul>
            ${files.map(file => `<li><a href="/download/${file}">${file}</a> <a href="/delete/${file}">[x]</a></li>`).join('')}
        </ul>

        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button type="submit">upload</button>
        </form>
    </body>
</html>`)

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
        // upload.mv(`${logic.getFilesFolder(username)}/${upload.name}`, function (err) {
        //     if (err)
        //         return res.status(500).send(err)

        //     res.redirect('/files')
        // })

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

    res.send(`<html>
    <head>
        <title>files</title>
        <link href="styles.css" rel="stylesheet">
        <link href="skylab-icon.png" type="image/png" rel="Shortcut Icon">
    </head>
    <body>
        <h1>register</h1>

        <form action="/register" method="post">
            <input type="text" name="username">
            <input type="password" name="password">
            <button type="submit">register</button>
        </form>

        ${session.registerError ? `<h2 class="error">${session.registerError}</h2>` : ''}
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

    session.registerError = ''

    try {
        if (logic.isLoggedIn(session.username)) {
            return res.redirect('/files')
        }
    } catch (err) {
        delete session.username
    }

    res.send(`<html>
    <head>
        <title>files</title>
        <link href="styles.css" rel="stylesheet">
        <link href="skylab-icon.png" type="image/png" rel="Shortcut Icon">
    </head>
    <body>
        <h1>login</h1>

        <form action="/login" method="post">
            <input type="text" name="username">
            <input type="password" name="password">
            <button type="submit">login</button>
        </form>

        ${session.loginError ? `<h2 class="error">${session.loginError}</h2>` : ''}        
    </body>
</html>`)
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