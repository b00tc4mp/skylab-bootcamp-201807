const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const pkg = require('./package.json')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')

const {argv: [, , port]} = process

const app = express()

app.use(fileUpload())
app.use(express.static('public'))
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug')
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
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/files', (req, res) => {
  const {session} = req
try {
    if (logic.isLoggedIn(session.username)) {
     /* const userDirectory = `files/${session.username}`

      if (!fs.existsSync(userDirectory))
        try {
          fs.mkdirSync(userDirectory)
        } catch (err) {
          throw err;
        }*/
      const files = fs.readdirSync('files')

      res.render('files',{files:files})

    } else {
      res.redirect('/')
    }
  } catch ({message}) {
    console.error("error",message)
    res.redirect('/')
  }
})

app.post('/files', (req, res) => {
  const {files: {upload}, session} = req

  if (upload) {
    session.error = ''

  /*  const userDirectory = `files/${session.username}`

    if (!fs.existsSync(userDirectory))
      try {
        fs.mkdirSync(userDirectory)
      } catch (err) {
        throw err;
      }*/

    //upload.mv(`files/${userDirectory}/${upload.name}`, function (err) {
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

app.get('/register', (req, res) => {
  const {session: {error}} = req

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

        ${error ? `<h2 class="error">${error}</h2>` : ''}
    </body>
</html>`)
})

app.post('/register', (req, res) => {
  const {session, body: {username, password}} = req

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
  } catch ({message}) {
    session.error = message

    res.redirect('/register')
  }
})

app.get('/login', (req, res) => {
  const {session: {error}} = req

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

        ${error ? `<h2 class="error">${error}</h2>` : ''}        
    </body>
</html>`)
})

app.post('/login', (req, res) => {
  const {session, body: {username, password}} = req

  try {
    logic.login(username, password)

    session.username = username

    res.redirect('/files')
  } catch ({message}) {
    session.error = message

    res.redirect('/login')
  }
})

app.listen(port, () => console.log(`${pkg.name} ${pkg.version} up and running on port ${port}`))