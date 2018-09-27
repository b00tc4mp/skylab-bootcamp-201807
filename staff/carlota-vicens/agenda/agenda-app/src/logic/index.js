const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else {
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
                }
            })
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(usermail, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('usermail', usermail)
                this._validateStringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ usermail, password }), 201)
                    .then(() => true)
            })
    },
    login(usermail, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('usermail', usermail)
                this._validateStringField('password', password)

                return this._call('login', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ usermail, password }), 200)
                    .then(res => res.json())
            })
    },
//
    addNotes(usermail,userID ,title, content, date, token){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('usermail',usermail)
                this._validateStringField('title',title)
                this._validateStringField('content',content)
                this._validateStringField('date',date)
                return this._call(`user/${userID}/notes`,'post',
                    { authorization: `bearer ${token}`,'content-type': 'application/json' }
                , JSON.stringify({title,content,date}),200) 
                .then(res => res.json())
            })
    },

    deleteNote(userID,noteId, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${userID}/notes/${noteId}`, 'delete', { authorization: `bearer ${token}`,'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    updateNotes(usermail,userID ,noteId, title, content, date, token){
        return Promise.resolve()
        .then(() => {
            this._validateStringField('usermail',usermail)
                return this._call(`user/${userID}/notes/${noteId}`, 'put', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({title,content,date}), 200)
            })
            .then(res => res)
    },

    listNotes(userID,token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${userID}/notes/`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
            })
            .then(res => res.json())
    },
//
    addContact(usermail, name, surname, phone, contactmail, address, token){
        return Promise.resolve()
            .then(() => {
                this._validateStringField("name", name)
                this._validateStringField("surname",surname)
                this._validateStringField("phone", phone)
                this._validateStringField("contactmail", contactmail)
                this._validateStringField("address",address)
                return this._call(`user/${usermail}/contacts`,'post',
                    { authorization: `bearer ${token}`,'content-type': 'application/json' }
                , JSON.stringify({name, surname, phone, contactmail, address}),200) 
                .then(res => res.json())
            })
    },

    deleteContact(usermail,contactId, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${usermail}/contacts/${contactId}`, 'delete', { authorization: `bearer ${token}`,'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    updateContact(usermail, id, name, surname, phone, contactmail, address, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${usermail}/contacts/${id}`, 'put', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({name, surname, phone, contactmail, address}), 200)
            })
            .then(res => res.json())
    },

    listContact(usermail,token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${usermail}/contacts/`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
            })
            .then(res => res.json())
    }
}




module.exports = logic