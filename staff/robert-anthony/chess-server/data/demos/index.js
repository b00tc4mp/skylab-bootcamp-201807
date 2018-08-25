const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const { User, Contact, Note } = require('../models')

let connection

mongoose.connect('mongodb://localhost/skylab', { useNewUrlParser: true })
    .then(conn => {
        connection = conn

        console.log('connected')

        return Promise.all([
            Note.deleteMany(),
            User.deleteMany()
        ])
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
        const contact = new Contact({ email: 'jd@mail.com' })

        user.contacts.push(contact)

        return user.save()
    })
    .then(user => {
        const note = new Note({ date: new Date(), text: 'hola mundo', user: user.id })

        return note.save()
    })
    .then(note => {
        return Note.findById(note.id).populate('user')
    })
    .then(note => {
        // console.log(JSON.stringify(note))

        return note.save()
    })
    .then(note => {
        console.log(JSON.stringify(note))
    })
    .catch(console.error)
    .finally(() =>
        connection.disconnect()
            .then(() => console.log('disconnected'))
    )