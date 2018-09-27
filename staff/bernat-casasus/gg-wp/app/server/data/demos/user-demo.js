const mongoose = require('mongoose')
const  User = require('../models/user')

mongoose.connect('mongodb://localhost/gg-wp', { useNewUrlParser: true })
    .then(() => {
        console.log('connected')
        // mongoose.connection.db.dropDatabase()
    })
    .then(async () => {

        const email01 = 'mail1@mail.com'
        const email02 = 'mail2@mail.com'
        const email03 = 'mail3@mail.com'
        const email04 = 'mail4@mail.com'

        const password01 = '123456'
        const password02 = '223456'
        const password03 = '323456'
        const password04 = '423456'

        const playerid01 = '87654321'
        const playerid02 = '87654322'
        const playerid03 = '87654323'
        const playerid04 = '87654324'

        const user01 = new User({
            email: email01,
            password: password01,
            players:[playerid01, playerid02]
        })

        const user02 = new User({
            email: email02,
            password: password02,
            players:[playerid02, playerid03]
        })

        const user03 = new User({
            email: email03,
            password: password03,
            players:[playerid03, playerid04]
        })

        const user04 = new User({
            email: email04,
            password: password04,
            players:[playerid04, playerid01]
        })

        await Promise.all([
            user01.save(),
            user02.save(),
            user03.save(),
            user04.save()
        ])

        return true;
       
    })
    .then(() => {
        console.log('demo completed')
    })
    .catch(console.error)
    .finally(() =>
        mongoose.disconnect()
            .then(() => console.log('disconnected'))
    )