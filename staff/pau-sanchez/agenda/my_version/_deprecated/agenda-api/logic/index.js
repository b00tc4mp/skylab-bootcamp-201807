
const uuidv4 = require('uuid/v4');
const validateMail = require('../utils/validate-mail/index')

const logic = {
    _users: null,

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
                    return this._users.insertOne({email, password,notes:[],contacts:[]})
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
                    return true
                    })
            })
    },

    addNote(email,title,content,date){
        return Promise.resolve()
            .then(() => {
                validateMail(email)
                this._validateStringField("title", title)
                this._validateStringField("content", content)
                
                return this._users.findOne({email})
                    .then((user) => {
                        if(!user) throw new SuperError(`user ${email} does not exist`)
                        const id = uuidv4()
                        // const notes = [...user.notes,{id,title,content,date}]
                        return this._users.updateOne({email}, {$push:{notes:{id,title,content,date}}})
                        // return this._users.updateOne({email},{$set:{notes}})
                            .then(() => id)
                    })
            })
    },

    deleteNote(email,id){
        
        return Promise.resolve()
            .then(() => {
                validateMail(email)
                return this._users.findOne({email,"notes.id":id})
                    .then((user) => {
                            if(!user) throw new SuperError(`note ${id} does not exist`)
                            return this._users.updateMany({ },{'$pull':{ 'notes':{id}}},{multi:true})
                                .then(res => {
                                    //db.getCollection('users').update({ },{'$pull':{ 'notes':{'id': "546005b1-8190-442e-866c-d267134fcc11" }}},{multi:true})
                                    return res
                                })
                        })
            })
    },

    updateNote(email, id, newTitle, newContent){
        
        return Promise.resolve()
        .then(() => {
            validateMail(email)
            this._validateStringField("title", newTitle)
            this._validateStringField("content", newContent)
                return this._users.findOne({email,"notes.id":id})
                .then((user) => {
                    if(!user) throw new SuperError (`note ${id} does not exist`)
                    return this._users.updateOne({"notes.id":id},{$set:{"notes.$.title":newTitle,"notes.$.content":newContent}})
                        .then(() => true)
                })
            })
    },

    listNotes(email) { 
        return Promise.resolve()
            .then(() => {
                validateMail(email)
                    return this._users.findOne({email})
                    .then(user => {
                        if(!user) throw new SuperError (`user ${user} does not exist`)
                        return user.notes
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