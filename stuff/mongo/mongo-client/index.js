const { MongoClient, ObjectId } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/skylab', { useNewUrlParser: true }, (err, conn) => {
    if (err) throw err

    const db = conn.db()

    const users = db.collection('users')

    //users.insert({ username: 'fulanito', password: '123' })

    // users.find().toArray()
    //     .then(users => console.log(users))
    //     .catch(console.error)

    // users.find({ username: 'pepito' }).toArray()
    //     .then(users => console.log(users))
    //     .catch(console.error)


    // users.findOne({ username: 'pepito' })
    //     .then(user => console.log(user))
    //     .catch(console.error)


    // users.findOne( ObjectId('5b7581cea5a02543413bdb7f'))
    //     .then(user => console.log(user))
    //     .catch(console.error)


    // users.updateOne({_id: ObjectId('5b7581cea5a02543413bdb7f')}, { $set: { password: 'abc' } })
    //     .then(res => console.log(res))
    //     .catch(console.error)

    // users.deleteOne({ _id: ObjectId('5b7581cea5a02543413bdb7f') })
    //     .then(res => console.log(res))
    //     .catch(console.error)

    users.find().toArray()
        .then(_users => {
            console.log(_users)

            return Promise.all(
                _users.map(user => users.updateOne({ _id: user._id }, { $set: { password: '123' } }))
            )
        })
        .then(() => users.find().toArray())
        .then(users => console.log(users))
        .catch(console.error)
        .finally(() => conn.close())
})