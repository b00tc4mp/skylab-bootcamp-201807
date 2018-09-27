const logic = {
    url: 'https://intense-reef-68642.herokuapp.com/api',

    /**
     * 
     * @description Api server call
     * 
     * @param {string} path
     * @param {string} method
     * @param {string} headers
     * @param {string} body
     * @param {number} expectedStatus
     */

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    
    },

    /**
     * @description Validate inputs registration and login
     * 
     * @param {string} fieldName
     * @param {string} fieldValue
     * 
     */

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw Error (`invalid ${fieldName}`)
    },

    /**
     * @description Register User
     * 
     * @param {string} email
     * @param {string} password
     * @param {string} name
     *
     */
    

    register(email, password, name) {
        return Promise.resolve()
            .then(() => {
                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password, name}), 201)
                    .then(() => true)
            })
    },

    
    /**
     * @description Authenticate User
     * 
     * @param {string} email
     * @param {string} password
     *
     */

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                return this._call('authenticate', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
            })
    },



    /**
     * 
     * @description  Unregister User 
     * 
     * @param {string} email
     * @param {string} password
     * @param {string} userId
     * @param {string} token
     *
     */
    

    unregister(email, password, userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`unregister/${userId}`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}`
                }, JSON.stringify({ email, password }), 200)
                    .then(() => true)
                    
                })
    },
       

    /**
     * 
     * @description  Update User Password
     * 
     * @param {string} email
     * @param {string} password
     * @param {string} newPassword
     * @param {string} userId
     * @param {string} token 
     * 
     */
    

    updatePassword(email, password, newPassword, userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${userId}`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}`
                }, JSON.stringify({ email, password, newPassword}), 200)
                    .then(() => true)
            })
    },


    /**
     * @description Create notebook
     * 
     * @param {string} userId
     * @param {string} notebooktitle
     * @param {string} videourl
     * @param {string} token
     * 
     */

    createNotebook(userId, notebooktitle, videourl, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notebook`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}`
             }, JSON.stringify({ notebooktitle, videourl}), 200)
                .then(res => res.json())
            })
    },



    /**
     * @description List all user notebooks
     * 
     * @param {string} userId 
     * @param {string} token 
     * 
     */

    listNotebooks(userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notebooks`, 'get' ,{'Content-Type': 'application/json', authorization: `bearer ${token}`},
                undefined, 200)
                .then(res => res.json())
            })
    },
            
    /**
     * @description List user notebooks by id
     * 
     * @param {string} userId
     * @param {string} notebookid
     * 
     */

    listNotebooksByNotebookId(userId, notebookid) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notebooks/${notebookid}`,'get', undefined, undefined, 200)
                .then(res => res.json())
            })
    },

     /**
     * 
     * @description Update notebook
     * 
     * @param {string} userId
     * @param {string} sessionuserid
     * @param {string} notebookid
     * @param {string} newnotebooktitle
     * @param {string} token
     * 
     */

    updateNotebook(userId, sessionuserid, notebookid, newnotebooktitle, token) {
        return Promise.resolve()
            .then(() => {
                    return this._call(`${userId}/notebooks/${notebookid}/update/${sessionuserid}`, 'PATCH',
                    {'Content-Type': 'application/json', authorization: `bearer ${token}`},
                    JSON.stringify({ newnotebooktitle }),
                    200)
                    .then(res => res.json())
                 
                })
    },
    
    /**
     * 
     * @description Delete notebook
     * 
     * @param {string} userId
     * @param {string} sessionuserid
     * @param {string} notebookid
     * @param {string} token
     * 
     */

    removeNotebook(userId, sessionuserid, notebookid, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/${userId}/notebooks/${notebookid}/delete/${sessionuserid}`,
                'delete',
                {authorization: `bearer ${token}`},
                undefined,
                200)
                .then(res => res.json())
            })
    },
        
    /**
     * 
     * @description Create note
     * 
     * @param {number} seconds
     * @param {string} notetitle
     * @param {string} notetext
     * @param {string} notebook
     * @param {string} userId
     * @param {string} token
     * 
     */

    createNote(seconds, notetitle, notetext, notebook, userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/${notebook}/note`,
                'post',
                {'Content-Type': 'application/json', authorization: `bearer ${token}`},
                JSON.stringify({ seconds, notetitle, notetext, notebook }),
                200)
                .then(res => res.json())
            })
    },


    /**
     * 
     * @description List notes by user id
     * 
     * @param {string} userId
     * @param {string} token
     * 
     */

    listNotesbyUser(userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notes`,
                'get',
                {authorization: `bearer ${token}`},
                undefined,
                200)
                .then(res => res.json())
            })
    },

    /**
     * 
     * @description List notes by notebook id
     * 
     * @param {string} userId
     * @param {string} notebookid
     * 
     */

    listNotebyNotebookId(userId, notebookid) {
        return Promise.resolve()
            .then(() => {
                    return this._call(`${userId}/${notebookid}/notes`,
                    'get',
                    undefined,
                    undefined,
                    200)
                    .then(res => res.json())
                })
            
    },

    /**
     * 
     * @description List note by note id
     * 
     * @param {string} userId
     * @param {string} noteId
     * 
     */

    listNotesbyNoteId(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/note/${noteId}`,
                'get',
                undefined,
                undefined,
                200)
                .then(res => res.json())
            })
    },

    /**
     * 
     * @description Remove note by noteid
     * 
     * @param {string} userId
     * @param {string} sessionuserid
     * @param {string} noteid
     * @param {string} token
     * 
     */

    removeNote(userId, sessionuserid, noteid, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/removenote/${noteid}/${sessionuserid}`,
                'delete',
                {authorization: `bearer ${token}`},
                undefined,
                200)
                .then(res => res.json())
            
            })
    },
    
    /**
     * 
     * @description Remove all notes in a notebook by notebook id
     * 
     * @param {string} userId
     * @param {string} sessionuserid
     * @param {string} notebookid
     * @param {string} token
     *  
     */

    removeNotebooksNotes(userId, sessionuserid, notebookid, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/removenotebooksnotes/${notebookid}/${sessionuserid}`,
                'delete',
                {authorization: `bearer ${token}`},
                undefined,
                200)
                .then(res => res.json())
            
            })
    },
    
    /**
     * 
     * @description Update note
     * 
     * @param {string} userId
     * @param {string} sessionuserid
     * @param {string} noteId
     * @param {string} newnotetitle
     * @param {string} newnotetext
     * @param {string} token
     * 
     */

    updateNote(userId, sessionuserid, noteId, newnotetitle, newnotetext, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/updatenote/${noteId}/${sessionuserid}`,
                'PATCH',
                {'Content-Type': 'application/json', authorization: `bearer ${token}`},
                JSON.stringify({ newnotetitle, newnotetext }),
                200)
                .then(res => res.json())
            })
    }




}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }
