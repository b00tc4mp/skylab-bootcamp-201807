module.exports = {
    init(app) {
        const http = require('http').Server(app)
        const io = require('socket.io')(http)

        io.on('connection', socket =>{
            console.log('connection established')

            socket.on("disconnect", () => {
                console.log("Disconnected")
            })
        })

        this._io = io

        return http
    },

    get io() {
        return this._io
    }
}
