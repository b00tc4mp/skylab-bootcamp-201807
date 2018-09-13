require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const { userRouter, productRouter, chatRouter } = require('./routes/index')
const mongoose = require('mongoose')
const socket = require('socket.io')
const socketLogic = require('./routes/sockets')

const { env: { MONGO_URL } } = process

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        const { PORT } = process.env

        const app = express()

        app.use(cors())

        app.use('/api', [userRouter, productRouter, chatRouter])

        
        
        //app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))



        const server = require('http').Server(app);
        const io = socket(server);


        socketLogic.setIO(io)

        server.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))
        /*io.on('connection', (socket) => {
            console.log(socket.id);
        
            socket.on('SEND_MESSAGE', function(data){
                io.emit('RECEIVE_MESSAGE', data);
            })
        });*/

    })
    .then(console.log('mongo db connected'))
    .catch(console.error)

