//1)  Levantamos servidor primero:
// const http =  require('http')

// const { argv: [, , port] } = process

// http.createServer((req, res) => {

// }).listen(port, () => console.log(`transfer-file server up and running on port ${port}`))


//2) Configuramos para que acepte POST's, y que nos muestre mensaje de recibido. Vamos a POST, y hacemos un post a http://localhost:8080 para comprobar q funcione.
// const http =  require('http')
// const fs = require('fs')

// const { argv: [, , port] } = process

// http.createServer((req, res) => {
//     if (req.method === 'POST'){
//         const ws = fs.createWriteStream('file.data')

//         req.pipe(ws)

//         req.on('end', () => res.end('ok, fieled recevied'))
//     }

// }).listen(port, () => console.log(`transfer-file server up and running on port ${port}`))


//3) creamos archivo client.js  




const http =  require('http')
const fs = require('fs')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.method === 'POST'){
        const ws = fs.createWriteStream('file.data')

        req.pipe(ws)

        req.on('end', () => res.end('ok, fieled recevied'))
    }

}).listen(port, () => console.log(`Server up and running on port ${port}`))