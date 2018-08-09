const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

app.use(fileUpload())

app.use(express.static('public'))

const errors = {
    EMPTY_FILE : 'cannot upload empty files'
}

// app.get('/helloworld', (req, res) => {
//     res.send(`<html>
//     <head>
//         <title>hola mundo</title>
//     </head>
//     <body>
//         <h1>hello world!</h1>
//     </body>
// </html>`)
// })

app.get('/files', (req, res) => {
    const files = fs.readdirSync('files')
    // const { query: { error } } = req
    const errorMessage = errors[error]

    // let errorMessage

    // const remoteAddress = req.connection.remoteAddress

    // const session = sessions[remoteAddress]


    res.send(`<html>
    <head>
        <title>files</title>
        <link href="styles.css" rel="stylesheet" />
    </head>
    <body>
        <ul>
            ${files.map(file => `<li><a href="/download/${file}">${file}</a>&nbsp;&nbsp;<a href="/delete/${file}">Delete</a></li>`).join('')}
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

    if(upload) {
        error = ''
        upload.mv(`files/${upload.name}`, function (err) {
            if (err)
                return res.status(500).send(err)

            res.redirect('/files')
        });
    // else
    //     res.redirect('/files?error=cannot upload empty files')
     } else {
        const remoteAddress = req.connection.remoteAddress
        const session = sessions[remoteAddress]

        if(!session)
        
        res.redirect('/files')
    }
})

// app.get("/test", (req,res) => {
//     console.log(__dirname)
//     console.log(__filename)
// })

app.get('/download/:file', (req, res) => {
    const file = `files/${req.params.file}`
    res.download(file);
});

app.get('/delete/:file', (req, res) => {
    const file = `files/${req.params.file}`
    fs.unlinkSync(file);

    res.redirect('/files')

});


app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))