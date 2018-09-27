const express = require('express')
//const fileUpload = require('express-fileupload')
const multer = require('multer')
const package = require('./package.json')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')

const {argv: [, , port]} = process

const app = express()

app.set('views', __dirname + '/public/views');

app.set('view engine', 'pug')

app.use(fileUpload())
app.use(express.static('public'))
app.use(express.static('data'))

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
  const {session} = req
  let loggedIn = false

  session.registerError = ''
  session.loginError = ''

  try {
    if (logic.isLoggedIn(session.username)) {
      return res.redirect('/files')
    }
  } catch (err) {
    delete session.username
  }

  res.render('index',{loggedIn})
})

app.get('/files', (req, res) => {
  const {session} = req
  let loggedIn = false
  try {
    if (logic.isLoggedIn(session.username)) {
      const files = logic.listFiles(session.username)
      loggedIn = true
      profileImage = logic.getUserData(session.username).profileImage
      res.render('file-get', {fileList: files, session, loggedIn, profileImage})

    } else {
      res.redirect('/')
    }
  } catch ({message}) {
    res.redirect('/')
  }
})

app.post('/files', (req, res) => {
  const {session, files: {upload}} = req

  if (upload) {

    try {
      logic.saveFile(session.username, upload.name, upload.data)
    } catch ({message}) {
      session.filesError = message
    }

    res.redirect('/files')
  } else {
    res.redirect('/files')
  }
})

app.get('/register', (req, res) => {
  const {session} = req
  let loggedIn = false

  session.loginError = ''

  try {
    if (logic.isLoggedIn(session.username)) {
      return res.redirect('/files')
    }
  } catch (err) {
    delete session.username
  }

  res.render('register-get', {session,loggedIn})
})

app.post('/register', (req, res) => {
  const {session, body: {username, password}} = req
  let loggedIn = false

  try {
    logic.register(username, password)

    res.render('register-post', {username,session,loggedIn})
  } catch ({message}) {
    session.registerError = message

    res.redirect('/register')
  }
})

app.get('/login', (req, res) => {
  const {session} = req
  let loggedIn = false

  session.registerError = ''

  try {
    if (logic.isLoggedIn(session.username)) {
      return res.redirect('/files')
    }
  } catch (err) {
    delete session.username
  }


  res.render('login',{loggedIn,session})
})

app.post('/login', (req, res) => {
  const {session, body: {username, password}} = req

  try {
    logic.login(username, password)

    session.username = username
    res.redirect('/files')
  } catch ({message}) {
    session.loginError = message

    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  const {session} = req

  session.loginError = ''

  try {
    logic.logout(session.username)
  } catch (err) {
    // noop
  }

  res.redirect('/')
})

app.get('/download/:file', (req, res) => {
  const {session, params: {file}} = req

  res.download(logic.getFilePath(session.username, file))
})

app.get('/delete/:file', (req, res) => {
  const {session, params: {file}} = req

  try {
    logic.removeFile(session.username, file)
  } catch ({message}) {
    // TODO
  }

  res.redirect('/files')
})


app.post('/profile', (req, res) => {
  const {session, files: {upload}} = req
  let profileImage = ''
  if (upload) {
    try {
      logic.saveUserImage(session.username, upload.name, upload.data)
    } catch ({message}) {
      session.profileError = message
    }

    try {
      profileImage = logic.getUserImagePath(session.username, upload.name)
    } catch ({message}) {
      session.profileError = message
    }
  }

  try {
    logic.setUserData(session.username, {info: req.body.info, profileImage})
  } catch ({message}) {
    session.profileError = message
  }
  res.redirect('/profile')

})


app.get('/profile', (req, res) => {
  const {session} = req
  let userData
  let loggedIn = false


  if (logic.isLoggedIn(session.username)) {
    try {
      loggedIn = true
      userData = logic.getUserData(session.username)
      res.render('profile_get', {session, info: userData.info, profileImage: userData.profileImage,loggedIn})
    } catch {
      // ??
    }
  } else {
    res.redirect('/')
  }

})


app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))