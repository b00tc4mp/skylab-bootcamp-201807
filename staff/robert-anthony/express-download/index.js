const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const pack = require('./package.json')

const {argv: [, , port]} = process

const app = express()

app.use(fileUpload())

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug')

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

  res.render("files",{files:files})

})


app.get("/downloads/:file", (req, res) => {
  res.download(__dirname + "/files/" + req.params.file)
  res.redirect("/files")
})

app.get("/delete/:file", (req, res) => {
  fs.unlinkSync(__dirname + "/files/" + req.params.file)
  res.redirect("/files")
})


app.post('/files', (req, res) => {
  const {files: {upload}} = req

  upload.mv(`files/${upload.name}`, function (err) {
    if (err)
      return res.status(500).send(err)

    res.redirect('/files')
  });
})

app.listen(port, () => console.log(`${pack.name} ${pack.version} up and running on port ${port}`))