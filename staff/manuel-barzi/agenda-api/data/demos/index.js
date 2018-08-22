const mongoose = require('mongoose')
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
        const contact = new Contact({ email: 'jd@mail.com', name: 'John', surname: 'Doe' })

        user.contacts.push(contact)

        user.contacts.push(new Contact({ email: 'fb@mail.com', name: 'Foo', surname: 'Bar' }))

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
        // console.log(note)

        return note.save()
    })
    .then(note => {
        // console.log(note)

        return User.find({}, /*{_id:0, __v:0}*/ { _id: 0, email: 1 })
        //return User.find({}, /*{_id:0, __v:0}*/ { _id: 0, email: 1 }).lean() // WARN! lean returns plain objects (disconnected objects)
        return User.aggregate([{ $project: { _id: 0, mail: '$email', id: '$_id' } }]) // WARN! aggregate returns plain objects (disconnected objects)
    })
    .then(users => {
        //console.log(users)

        const [user] = users

        return user.save()
    })
    .then(user => {
        // console.log(user)

        return User.aggregate([{
            $project: {
                contacts: {
                    $filter: {
                        input: '$contacts',
                        as: 'contact',
                        cond: { $eq : ['$$contact.name', 'John']}
                        // cond: { $eq : ['$$contact.email', 'jd@mail.com']}
                    }
                }
            }
        }])
    })
    .then(users => {
        console.log(users)
    })
    .catch(console.error)
    .finally(() =>
        connection.disconnect()
            .then(() => console.log('disconnected'))
    )