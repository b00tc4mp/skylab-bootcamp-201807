
const socketLogic = {
    io: null,

    sendChat(receiver) {
        this.io.emit(`chat message for ${receiver}`)
    },

    setIO(io) {
        this.io = io


        /*io.on('connection', (socket) => {
            console.log(socket)
            console.log('usuario conectado')
        })*/

    },

}


module.exports = socketLogic