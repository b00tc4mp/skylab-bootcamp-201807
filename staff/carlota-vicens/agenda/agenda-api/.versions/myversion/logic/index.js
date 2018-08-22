
const uuidv4 = require('uuid/v4');
const validateMail = require('../utils/validate-mail/index')
const {ObjectID} = require('mongodb')

const logic = {
    _users: null,
    _notes: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new SuperError(`invalid ${fieldName}`)
    },

    register(email, password){
       return Promise.resolve()
        .then(() => {
            validateMail(email)
            this._validateStringField('password', password)

            return this._users.findOne({email})
            .then(user => {
                    if(user) throw new SuperError(`user ${email} already exists`)
                    return this._users.insertOne({email, password})
                })
            })
            .then(() => true)

    },

    login(email,password) {
        return Promise.resolve()
        .then(() => {
            validateMail(email)
            this._validateStringField('password', password)

            return this._users.findOne({email})
            .then(user => {
                    if(!user) throw new SuperError(`user ${email} does not exist`)
                    if(user.password !== password) throw new SuperError("wrong credentials")
                    return user._id
                    })
            })
    },

    addNote(userID,title,content,date){
        return Promise.resolve()
            .then(() => {
                this._validateStringField("title", title)
                this._validateStringField("content", content)
                this._validateStringField("date", date)
                
                return this._users.findOne({"_id":ObjectID(userID)})
                    .then((user) => {
                        if(!user) throw new SuperError(`user ${userID} does not exist`)
                        // const id = uuidv4()
                        // const notes = [...user.notes,{id,title,content,date}]
                        // return this._users.updateOne({email}, {$push:{notes:{id,title,content,date}}})
                        return this._notes.insertOne({title,content,date,userID})
                            .then((res) => {
                                return res
                            })
                    })
            })
    },

    deleteNote(userID,noteId){
        
        return Promise.resolve()
            .then(() => {
                return this._notes.findOne({"_id":ObjectID(noteId)})
                    .then((note) => {
                            if(!note) throw new SuperError(`note ${noteId} does not exist`)
                            if(note.userID !== userID) throw new SuperError(`note ${noteId} does not belong to you`)
                                return this._notes.deleteOne({_id:ObjectID(noteId)})
                    })
                    .then(() => true)
            })
},

    updateNote(userID, noteId, newTitle, newContent,newDate){
        
        return Promise.resolve()
        .then(() => {
            this._validateStringField("title", newTitle)
            this._validateStringField("content", newContent)
            this._validateStringField("date", newDate)
                return this._users.findOne({"_id":ObjectID(userID)})
                .then((user) => {
                    if(!user) throw new SuperError (`user ${userID} does not exist`)
                    return this._notes.updateOne({"_id":ObjectID(noteId)},{$set:{"title":newTitle,"content":newContent,"date":newDate}})
                        .then(() => true)
                })
            })
    },

    listNotes(userID) { 
        return Promise.resolve()
            .then(() => {
                    return this._notes.find({userID},(err,notes) => {
                        return new Promise((resolve,reject) => {
                            
                            if(err) return reject(err)
                            resolve(notes.toArray())
                        })
                    })
            })
    },

    addContact(email, name, surname, phone, contactmail, address){
       return Promise.resolve()
            .then(() => {
                validateMail(email)
                this._validateStringField("name", name)
                this._validateStringField("surname",surname)
                this._validateStringField("phone", phone)
                this._validateStringField("contactmail", contactmail)
                this._validateStringField("address",address)
                return this._users.findOne({email})
                    .then((user) => {
                        if(!user) throw new SuperError (`user ${user} does not exist`)
                        const id = uuidv4()
                        // const contacts = [...user.contacts, {name, surname, phone, contactmail, address}] 
                        return this._users.updateOne({email}, {$push:{contacts:{id,name, surname, phone, contactmail, address}}})
                            .then(() => {
                                return id
                            })
                    })
            })
    },

    deleteContact(email,id){
        
        return Promise.resolve()
            .then(() => {
                validateMail(email)
                    return this._users.findOne({email, "contacts.id":id})
                    .then((user) => {
                            if(!user) throw new SuperError(`contact ${id} does not exist`)
                            return this._users.updateMany({ },{'$pull':{ 'contacts':{id}}},{multi:true})
                                .then(res => {
                                    //db.getCollection('users').update({ },{'$pull':{ 'notes':{'id': "546005b1-8190-442e-866c-d267134fcc11" }}},{multi:true})
                                    return res
                                })
                        })

            })
    },

    updateContact(email, id, name, surname, phone, contactmail, address){
        
        return Promise.resolve()
        .then(() => {
            validateMail(email)
            this._validateStringField("name", name)
            this._validateStringField("surname",surname)
            this._validateStringField("phone", phone)
            this._validateStringField("contactmail", contactmail)
            this._validateStringField("address",address)
            return this._users.findOne({email,"contacts.id":id})
            .then((user) => {
                if(!user) throw new SuperError (`contact ${id} does not exist`)
                return this._users.updateOne({"contacts.id":id},{$set:{"contacts.$.name":name,"contacts.$.surname":surname,"contacts.$.phone":phone,"contacts.$.contactmail":contactmail,"contacts.$.address":address}})
                    .then(() => true)
            })
        })
    },

    listContacts(email) { 
        return Promise.resolve()
            .then(() => {
                validateMail(email)
                return this._users.findOne({email})
                    .then(user => {
                        if(!user) throw new SuperError (`user ${user} does not exist`)
                        return user.contacts
                    })
            })
    },

    updateContact(email, id, newName, newSurname, newPhone, newContactmail, newAddress){
        
    return Promise.resolve()
        .then(() => {       
            validateMail(email)
            this._validateStringField("newName", newName)
            this._validateStringField("newSurname",newSurname)
            this._validateStringField("newPhone", newPhone)
            this._validateStringField("newContactmail", newContactmail)
            this._validateStringField("newAddress",newAddress)
            return this._users.findOne({email,"contacts.id":id})
                .then((user) => {
                    if(!user) throw new SuperError (`contact ${id} does not exist`)
                    return this._users.updateOne({"contacts.id":id},{$set:{"contacts.$.name":newName,"contacts.$.surname":newSurname,"contacts.$.phone":newPhone,"contacts.$.contactmail":newContactmail,"contacts.$.address":newAddress}})
                        .then(() => true)
                })
        })
    }
}

class SuperError extends Error{
    constructor(message){
        super(message)
    }
}

module.exports = {logic,SuperError}