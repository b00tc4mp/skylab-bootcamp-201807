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
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw Error (`invalid ${fieldName}`)
    },

    //@route    POST api/register
    //@desc     Register User
    //@access   Public

    register(email, password, name) {
        return Promise.resolve()
            .then(() => {
                //this._validateStringField('username', username)
                //this._validateStringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password, name}), 201)
                    .then(() => true)
            })
    },

    //@route    POST api/authenticate
    //@desc     Authenticate User
    //@access   Public


    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                //this._validateStringField('password', password)
                //debugger
                return this._call('authenticate', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    //.then(({ token }) => token)
            })
    },

    //@route    POST api/unregister
    //@desc     Unregister User
    //@access   Private

    unregister(email, password, userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`unregister/${userId}`, 'delete', {'Content-Type': 'application/json', authorization: `bearer ${token}`
                }, JSON.stringify({ email, password }), 200)
                    .then(() => true)
                    
                })
    },
       


    //@route    POST api/update
    //@desc     Update User Password
    //@access   Private-Token

    updatePassword(email, password, newPassword, userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`user/${userId}`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}`
                }, JSON.stringify({ email, password, newPassword}), 200)
                    .then(() => true)
            })
    },




    //@route    POST api/:id/notebook
    //@desc     Create notebook
    //@access   Private-Token

    createNotebook(userId, notebooktitle, videourl, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notebook`, 'post', {'Content-Type': 'application/json', authorization: `bearer ${token}`
             }, JSON.stringify({ notebooktitle, videourl}), 200)
                .then(res => res.json())
            })
    },




    //@@    GET api/:id/notebooks
    //@@    List all user notebooks
    //@@    Private-Token

    listNotebooks(userId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notebooks`, 'get' ,{'Content-Type': 'application/json', authorization: `bearer ${token}`},
                undefined, 200)
                .then(res => res.json())
            })
            
    },


    //@@    GET api/:id/notebooks/:notebookid
    //@@    List user notebooks by id
    //@@    Public-Share

    listNotebooksByNotebookId(userId, notebookid) {
        return Promise.resolve()
            .then(() => {
                return this._call(`${userId}/notebooks/${notebookid}`,'get', undefined, undefined, 200)
                .then(res => res.json())
            })
    },

    //@@    GET api/:id/notebooks/:notebookid/update
    //@@    Update notebook
    //@@    Private-Token

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
    

    //@@    DELETE api/:id/notebooks/:notebookid/delete
    //@@    Delete notebook
    //@@    Private-Token

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
        

    //@@    POST api/:id/note
    //@@    Create note
    //@@    Private-Token

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


    //@@    GET api/:id/notes
    //@@    List notes by user id
    //@@    Private-Token

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

    //@@    GET api/:id/:notebookdid/notes
    //@@    List notes by notebook id
    //@@    Public/Share

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

    //@@    GET api/:id/note/:noteid
    //@@    List note by note id
    //@@    Public-Share

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

    //@@    DELETE api/:id/removenote/:noteid
    //@@    Remove note by noteid
    //@@    Private-Token

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
    ////////////////////////
    //@@    DELETE api/:id/removenotebooksnotes/:notebookid/:sessionUserId
    //@@    Remove all notes in a notebooks by notebookid
    //@@    Private-Token

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
    /////////////////////////////
    //@@    UPDATE api/:id/updatenote/:noteid
    //@@    Update note
    //@@    Private-Token

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
