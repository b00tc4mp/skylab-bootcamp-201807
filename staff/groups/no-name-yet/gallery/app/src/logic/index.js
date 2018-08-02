/** Business Logic about gallery app */
const logic = {

    /** This is a setter to store the user id in sessionStorage
    * @param {string} userId - The user id
    */
    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    /** This is a getter to retrieve the userId from sessionStorage 
    * @return {string} The user id 
    */
    get _userId() {
        return sessionStorage.getItem('userId')
    },

    /** This is a setter to store the user token in sessionStorage
    * @param {string} userToken - The user token
    */
    set _userToken(userToken) {
        sessionStorage.setItem('userToken', userToken)
    },

    /** This is a getter to retrieve the user token from sessionStorage 
    * @return {string} The user token
    */
    get _userToken() {
        return sessionStorage.getItem('userToken')
    },

    /** This is a setter to store the user username in sessionStorage
    * @param {string} userUsername - The user username
    */
    set _userUsername(userUsername) {
        sessionStorage.setItem('userUsername', userUsername)
    },

    /** This is a getter to retrieve the user username from sessionStorage
    * @return {string} The user username
    */
    get userUsername() {
        return sessionStorage.getItem('userUsername')
    },

    /** This is a setter to store the user password in sessionStorage
    * @param {string} userPassword - The user password
    */
    set _userPassword(userPassword) {
        sessionStorage.setItem('userPassword', userPassword)
    },

    /** This is a getter to retrieve the user password from sessionStorage
    * @return {string} The user password
    */
    get _userPassword() {
        return sessionStorage.getItem('userPassword')
    },

    /** This is the function to call the User's api
     * @param {string} path - The api endpoint
     * @param {string} method - The call method
     * @param {object} body - The body of the call
     * @param {string} useToken - The token to do the call
     * @return {promise} - The fetch to the api
     */
    _callUsersApi(path, method = 'get', body, useToken) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || useToken) {
            config.headers = {}

            if (methodNotGet)
                config.headers['content-type'] = 'application/json'

            if (useToken)
                config.headers.authorization = 'Bearer ' + this._userToken
        }

        if (body)
            config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO')
                    throw Error(res.error)

                return res;
            })
    },


    // user's
    /** This is the function to register a user 
     * @param {string} username - The user username
     * @param {string} password - The user password
     * @return {function} - Call to the users api
     */
    registerUser(username, password) {
        return this._callUsersApi('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    /** This is the function to login a user
    * @param {string} username - The user username
    * @param {string} password - The user password
    * @return {function} - Call to the users api
    */
    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', { username, password })
            .then(({ data: { id, token } }) => {
                this._userId = id
                this._userToken = token
                this._userUsername = username
                this._userPassword = password
                return this.retrieveImages()
            })
    },

    /** This is the function to logout */
    logout() {
        this._userId = null
        this._userToken = null
        this._userUsername = null

        sessionStorage.clear()
    },

    /** This is a getter to check if a user is logged in
     * @return {boolean} - The user is logged in (true) or not (false) 
     */
    get loggedIn() {
        return this._userId && this._userToken && this.userUsername
    },

    /** This is the function to update user
     * @param {string} password - The user password
     * @param {string} newUsername - The new user username
     * @param {string} newPassword - The new user password
     * @return {function} - Call to the users api 
     */
    updateUser(password, newUsername, newPassword) {
        const data = {
            username: this.userUsername,
            password
        }

        if (newUsername)
            data.newUsername = newUsername

        if (newPassword)
            data.newPassword = newPassword

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                if (newUsername)
                    this._userUsername = newUsername
                if (newPassword)
                    this._userPassword = newPassword

                return true
            })
    },

    /**
     * This is the function to unregister a user
     * @param {string} password - The user password
     * @return {function} - Call to the user api
     */
    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this.userUsername,
            password
        }, true)
            .then(() => this.deleteAll())
            .then(() => this.deleteFolder())
    },

    // cloudinary api

    /** This is a setter to store the user images in sessionStorage
   * @param {array} userImages - The user images
   */
    set _userImages(userImages) {
        sessionStorage.setItem('userImages', JSON.stringify(userImages))
    },

    /** This is a getter to retrieve the user images from sessionStorage 
   * @return {array} - The user images
   */
    get _userImages() {
        return JSON.parse(sessionStorage.getItem('userImages')) || []
    },

    API_KEY: '311749718863248',

    API_SECRET: 'C_067ivTpTUyXOLV5kt1D1MPdfQ',

    CLOUD_NAME: 'galleryapp',

    PRESET: 'zbhkr9id',

    /** This is the function to call Cloudinary api
     * @param {string} path - The path for the api
     * @param {string} method - The method of the call
     * @param {file} img - The image of the call
     * @return {promise} - The fetch to the Cloudinary api
     */
    _callCloudinaryApi(path, method, img = undefined) {
        const myUrl = `https://${this.API_KEY}:${this.API_SECRET}@api.cloudinary.com/v1_1/${this.CLOUD_NAME}${path}`
        const config = {
            method
        }
        if (method === 'post') {
            let formData = new FormData()
            formData.append('file', img)
            formData.append('upload_preset', this.PRESET)
            formData.append('folder', this.userUsername)
            config.body = formData
        }
        return fetch(`https://skylabcoders.herokuapp.com/proxy?url=${myUrl}`, config)
            .then(res => res.json())
            .catch(err => err.message)
    },

    /** This is the function to add an image to Cloudinary api
     * @param {file} img - The image
     * @return {function} - Call to api
     */
    addImage(img) {
        return this._callCloudinaryApi('/upload', 'post', img)
            .then(({ public_id, url }) => {
                const id = public_id
                let images = this._userImages
                images.push({ id, url })
                this._userImages = images
                return true
            })
    },

    /** This is the function to retrieve images from Cloudinary api
     * @return {function} - Call to api
     */
    retrieveImages() {
        return this._callCloudinaryApi(`/resources/image/upload/?prefix=${this.userUsername}`, 'get')
            .then(res => res.resources)
            .then(res => res.map(item => ({ url: item.url, id: item.public_id })))
            .then(res => {
                this._userImages = res
                return true
            })
    },

    /** This is the function to delete all images from a folder
     * @return {function} - Call to api
     */
    deleteAll() {
        return this._callCloudinaryApi(`/resources/image/upload/?prefix=${this.userUsername}`, 'delete')
            .then(() => {
                this._userImages = []
                return true
            })
    },

    /** This is the function to delete a folder 
     * @return {function} - Call to api
     */
    deleteFolder() {
        return this._callCloudinaryApi(`/folders/${this.userUsername}`, 'delete')
            .then(res => {
                this.userImages = res
                return true
            })
    },

    /** This is the function to delete an image 
     * @param {string} id - The id of the image
     * @return {function} - Call to api
     */
    deleteImage(id) {
        return this._callCloudinaryApi(`/resources/image/upload/?public_ids=${id}`, 'delete')
            .then(() => {
                let images = this._userImages
                const ids = images.map(({ id }) => id)
                let index = ids.indexOf(id)
                if (index === -1) throw new Error('image not found in deletion')
                images.splice(index, 1)
                this._userImages = images
                return true
            })
    },

    // cloudmersive api
    /** This is the function to call Cloudmersive api
     * @param {file} image - The image 
     * @param {string} style - Name of tranforming style
     * @return {promise} -  The fetch to the Cloudmersive api
     */
    _callCloudmersiveApi(image, style) {
        let formData = new FormData()
        formData.append('file', image)
        const myUrl = `https://api.cloudmersive.com/image/artistic/painting/${style}`
        const config = {
            method: 'post',
            headers: {
                'Apikey': 'e7ea85bd-7635-499e-824e-1a13d942cace'
            },
            body: formData
        }
        return fetch(`https://skylabcoders.herokuapp.com/proxy?url=${myUrl}`, config)
            .then(res => res.body)
            .then(body => {
                const reader = body.getReader()
                return new ReadableStream({
                    start(controller) {
                        return pump()
                        function pump() {
                            return reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close()
                                    return;
                                }
                                controller.enqueue(value)
                                return pump()
                            });
                        }
                    }
                })
            })
            .then(stream => new Response(stream))
            .then(response => response.blob())
            .catch(err => err.message)
    },

    /** This is the function to transfer the style into the image
     * @param {file} image -  The image
     * @param {string} style - The style
     */
    transfer(image, style) {
        return this._callCloudmersiveApi(image, style)
    }
}

if (typeof module !== 'undefined') module.exports = logic;
