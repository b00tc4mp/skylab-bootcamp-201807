
const uuidv4 = require('uuid/v4');

const logic = {
    _users: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(email, password){
       return Promise.resolve()
        .then(() => {
            this._validateStringField('email', email)
            this._validateStringField('password', password)

            return this._users.findOne({email})
            .then(user => {
                    if(user) throw new Error(`user ${email} already exists`)
                    return this._users.insertOne({email, password,notes:[]})
                })
            })
            .then(() => true)

    },

    login(email,password) {
        return Promise.resolve()
        .then(() => {
            this._validateStringField('email', email)
            this._validateStringField('password', password)

            return this._users.findOne({email})
            .then(user => {
                    if(!user) throw new Error(`user ${email} doesnt exist`)
                    if(user.password !== password) throw new Error("wrong credentials")
                    return true
                    })
            })
    },

    addNote(email,title,content){
        this._validateStringField("title", title)
        this._validateStringField("content", content)

        return this._users.findOne({email})
            .then((user) => {
                if(!user) throw new Error(`user ${email} doesnt exist`)
                const id = uuidv4()
                const notes = [...user.notes,{id,title,content}]
                return this._users.updateOne({email},{$set:{notes}})
                    .then(() => id)
            })
    },

    deleteNote(email,id){
        this._validateStringField("email", email)

        return Promise.resolve()
            .then(() => this._users.findOne({email}))
            .then((user) => {
                    if(!user) throw new Error(`user ${email} doesnt exist`)
                    return this._users.updateMany({ },{'$pull':{ 'notes':{id}}},{multi:true})
                        .then(res => {
                            //db.getCollection('users').update({ },{'$pull':{ 'notes':{'id': "546005b1-8190-442e-866c-d267134fcc11" }}},{multi:true})
                            return res
                        })
                })
    }
}

// .then(() => {
//     this._validateStringField('email', email)
//     this._validateStringField('password', password)

//     return this._users.findOne({ email })
// })
// .then(user => {
//     if(user) throw new Error(`user ${user} already exists`)
//     return this._users.insert({email, password})
// })
// .then(() => true)

module.exports = logic