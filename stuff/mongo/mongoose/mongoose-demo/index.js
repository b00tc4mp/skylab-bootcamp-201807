const mongoose = require('mongoose')
const User = require('./models/user')

let connection

mongoose.connect('mongodb://localhost/skylab', { useNewUrlParser: true })
    .then(conn => {
        connection = conn

        console.log('connected')

        return User.deleteMany()
    })
    .then(() => {

        // ...

        const user = new User()

        user.email = 'mb@mail.com'
        user.password = '123456'

        return user.save()
    })
    .then(user => {
        user.photo = 'http://images.com/12345'

        return user.save()
    })
    .then(user => {
        const { id } = user

        return User.findById(id)
    })
    .then(user => {
        user.age = 25

        return user.save()
    })
    .then(user => {
        debugger
    })
    .catch(console.error)
    .finally(() =>
        connection.disconnect()
            .then(() => console.log('disconnected'))
    )