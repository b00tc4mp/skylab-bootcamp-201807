const logic = {
 /**
   * Sets the user id in session storage
   *
   * @param userId {string}
   * @private
   */
  set _userId(userId) {
    sessionStorage.setItem('userId', userId)
  },
  /**
   * Retrieves user id from session storage
   *
   * @returns {string}  The user id
   * @private
   */
  get _userId() {
    return sessionStorage.getItem('userId')
  },
 /**
   * Sets the user token provided by user API in session storage
   *
   * @param  {string} userToken The user token provided by the API
   * @private
   */
  set _userToken(userToken) {
    sessionStorage.setItem('userToken', userToken)
  },
  /**
   *  Retrieves the user API user token from session storage
   *
   * @returns {string} The user user token
   * @private
   */
  get _userToken() {
    return sessionStorage.getItem('userToken')
  },
 /**
   * Sets the user name in session storage
   *
   * @param  {string} userUsername The user name
   * @private
   */
  set _userUsername(userUsername) {
    sessionStorage.setItem('userUsername', userUsername)
  },
 /**
   * Retrieves the user name from session storage
   *
   * @returns {string} The user name
   */
  get userUsername() {
    return sessionStorage.getItem('userUsername')
  },

  /**
   * Sets the user password in session storage
   *
   * @param  {string} userPassword The user password
   * @private
   */
  set _userPassword(userPassword) {
    sessionStorage.setItem('userPassword', userPassword)
  },
    /**
   * Sets the cloudinary URL of the user profile picture in session storage
   *
   * @param {string} cloudinaryURL The cloudinary URL for the profile picture
   * @private
   */
  set _cloudinaryURL(cloudinaryURL) {
    sessionStorage.setItem('cloudinaryURL', cloudinaryURL)
  },


  /**
   * Retrieves the user password from session storage
   *
   * @returns {string} The user password
   * @private
   */

  get _userPassword() {
    return sessionStorage.getItem('userPassword')
  },

 /**
   * Sets the user's "favorites" in session storage
   *
   * @param  {[{objectNumber: string, imageurl: number}]} userFavorites
   * @private
   */

  set _userFavorites(userFavorites) {
    sessionStorage.setItem('userFavorites', JSON.stringify(userFavorites))
  },

  /**
   * Retrieves the user favorites from session storage
   *
   * @returns {[{objectNumber: string, imageurl: number}]} An array of objects representing user favorites
   * @private
   */

  get _userFavorites() {
    return JSON.parse(sessionStorage.getItem('userFavorites')) || []
  },

  /**
   * Retrieves the Cloudinary url of the user profile image from session storage or an empty string
   *
   * @returns {string}  The Cloudinary url of the user profile image
   * @private
   */
  get _cloudinaryURL() {
    return sessionStorage.getItem('cloudinaryURL') || ""
  },


  /**
   * Retrieves the Cloudinary url of the user profile image
   *
   * @returns {string} The Cloudinary url of the user profile image
   */

  get cloudinaryURL() {
    return this._cloudinaryURL;
  },

  /**
   * Calls the user API directly, sending and/or retrieving data  -- can be any kind of HTTP call
   *
   * @param path {string} Partial path for users API call
   * @param  {string} [method = get] The HTTP method to use, defaults to "get"
   * @param {Object} [body]  The body to pass to the API
   * @param {string} useToken Whether to use the API user token for the call
   * @returns {Promise<Object>} A promise which resolves to an object representing the results of the call
   * @private
   */

  _callUsersApi(path, method = 'get', body, useToken) {
    const config = {
      method
    }

    const methodNotGet = method !== 'get'

    if (methodNotGet || useToken) {
      config.headers = {}

      if (methodNotGet) config.headers['content-type'] = 'application/json'

      if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
    }

    if (body) config.body = JSON.stringify(body)

    return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'KO') throw Error(res.error)

        return res;
      })
  },

  // user's


  /**
   * Registers the user with the user API
   *
   * @param {string} name The user name to register with the user API
   * @param {string} lastname The lastname to register with the user API
   * @param {string} username The username to register with the user API
   * @param {string} email The email to register with the user API
   * @param {string} password The password to register with the user API
   * @param {string} imageFileName The file path for the profile image to register with the user API
   * @returns {Promise<Number>} A promise that resolves to the new user ID
   */

  registerUser(name, lastname, username, email, password, imageFileName) {
    if (!imageFileName) {
      return this._callUsersApi('/user', 'post', { username, password, name, lastname, email})
        .then(res => res.data.id)
    } else if (imageFileName) {
      return this.uploadCloudinaryImage(imageFileName)
        .then(cloudinaryData => {
          const cloudinaryURL = cloudinaryData.secure_url
          return this._callUsersApi('/user', 'post', { username, password, name, lastname, email, cloudinaryURL })

        }).then(res => res.data.id)
    }
  },

    /**
   * Logs the user into the user API
   *
   * @param {string} username The user's username
   * @param {string} password The user's password
   * @returns {Promise<boolean>} A promise that resolves to true if successful
   */

  loginUser(username, password) {
    return this._callUsersApi('/auth', 'post', { username, password })
      .then(({ data: { id, token } }) => {
        this._userId = id
        this._userToken = token
        this._userUsername = username
        this._userPassword = password // IDEAL encrypt it!

        // return true
        return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
      })
      .then(({ data }) => {
        this._userFavorites = data.favorites || []
        this._cloudinaryURL = data.cloudinaryURL || ""
        return true
      })
  },

    /**
   * Logs the user out and clears the user's session storage
   */

  logout() {
    this._userId = null
    this._userToken = null
    this._userUsername = null

    sessionStorage.clear()
  },

    /**
   * Returns user's logged-in status
   *
   * @returns {boolean} The user's logged-in status
   */

  get loggedIn() {
    return !!(this._userId && this._userToken && this.userUsername)
  },

    /**
   * Updates user information with user API, returns true if successful
   *
   * @param {string} password User's password
   * @param {string} [newUsername] New username
   * @param {string} [newPassword] New password
   * @param {string} [newEmail] New email
   * @returns {Promise<boolean>} A promise that resolves to true if successful
   */

  updateUser(password, newUsername, newPassword, newEmail) {
    const data = {
      username: this.userUsername,
      password
    }

    if (newUsername) data.newUsername = newUsername

    if (newEmail) data.email = newEmail

    if (newPassword) data.newPassword = newPassword

    return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
      .then(() => {
        if (newUsername) this._userUsername = newUsername

        return true
      })
  },


  /**
   * Unregister's user from user API
   *
   * @param {string} password User's password
   * @returns {Promise<boolean>} A promise that resolves to true if successful
   */

  unregisterUser(password) {
    return this._callUsersApi(`/user/${this._userId}`, 'delete', {
      username: this.userUsername,
      password
    }, true)
      .then(() => true)
  },

  // retrieveUser() {
  //     return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
  //         .then(({ data }) => data)
  // },


  /**
   * Toggles the "favorite" status in the user API of the passed object
   *
   * @param {Object} objectData The object data which represents the item to set/remove as favorite
   * @returns {Promise<boolean>} A promise that resolves to true if successful
   */

  toggleImageFavorite(objectData) {
    console.log("toggleImageFavorite")
    const favorites = this._userFavorites
    const index = favorites.findIndex(element => element.objectNumber === objectData.objectNumber)

    if (index > -1) {
      favorites.splice(index, 1)
    } else {
      favorites.push(objectData)
    }

    const data = {
      username: this.userUsername,
      password: this._userPassword,
      favorites
    }

    return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
      .then(() => {
        this._userFavorites = favorites

        return true
      })
  },

   /**
   * Determines whether the artwork is a user favorite or not by object number
   *
   * @param objectNumber The object number of the artwork
   * @returns {boolean} Returns true if is favorite, false if not
   */

  isFavorite(objectNumber) {
    // return this._userFavorites.includes(objectNumber)
    return this._userFavorites.some(element => element.objectNumber === objectNumber)
  },

    /**
   * Stores arbitrary data in the user API in the field 'fieldName'
   *
   * @param {string} fieldName The field in which to store the data in the user API
   * @param data The data
   * @returns {Promise<boolean>} A promise that resolves to true if successful
   */

  storeUserData(fieldName, data) {
    return this._callUsersApi(`/user/${this._userId}`, 'put', {
      username: this.userUsername,
      password: this._userPassword,
      [fieldName]: data,
    }, true)
      .then(() => {
        return true
      })
  },

  /**
   * Retrieves arbitrary user data in field 'fieldName' from user API
   *
   * @param {string} fieldName The field in which to store the data
   * @returns {Promise<T>} Returns a promise the resolves to the data if sucessful, null if not
   */

  retrieveUserData(fieldName) {
    return this._callUsersApi(`/user/${this._userId}`, 'get', null, true)
      .then((res) => {
        if (res && res.data && res.data[fieldName]) return res.data[fieldName];
        else return null;
      })
    /* .catch(err => console.error)*/
  },


  // MUSEUM API

  museumKey: 'ROQio02r',

  /**
   * Calls the Rijksmuseum API with a query and returns the results
   *
   * @param {string} query The query to send
   * @returns {Promise<{}>} Returns a promise the resolves to the API response
   * @private
   */

  _callRijksmuseumApiQuery(query) {
    const searchString = `https://www.rijksmuseum.nl/api/en/collection?key=${this.museumKey}&q=${query}&ps=100`;
    return fetch(searchString)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error('request error, status ' + res.error.status);

        return res;
      });
  },


    /**
   * Gets an artwork's 'object details' from the Rijksmuseum API for a particular object number
   *
   * @param {string} objectNumber The object number representing the artwork
   * @returns {Promise<{}>} A promise that resolves to the response
   * @private
   */

  _callRijksmuseumApiObjectDetail(objectNumber) {
    const searchString = `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${this.museumKey}&format=json`;
    return fetch(searchString)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error('request error, status ' + res.error.status);

        return res;
      });
  },


  /**
   * Searches the Rijksmuseum API for artworks that match a particular query
   *
   * @param {string} query The query string
   * @returns {Promise<[]>} A promise the resolves to an array of art objects
   */

  searchMuseum: function (query) {
    return this._callRijksmuseumApiQuery(query)
      .then(res => {
        return res.artObjects
      })
  },

    /**
   * Searches the Rijksmuseum API for artworks that match a particular query
   *
   * @param {string} query The query string
   * @returns {Promise<[{objectNumber: string,
   * id:string,imageurl: string,
   * title: string,
   * longTitle: string,
   * maker:string}]>} A promise the resolves to an array of objects representing artworks found
   */

  getMuseumImagesForSearchTerm(query) {
    return this._callRijksmuseumApiQuery(query.trim().replace(/ /g, "%20"))
      .then(res => {
        return res.artObjects.filter(element => element.hasImage).map(element => {
          return {
            objectNumber: element.objectNumber,
            id: element.id,
            imageurl: element.webImage.url,
            title: element.title,
            longTitle: element.longTitle,
            maker: element.principalOrFirstMaker
          }
        })

      })
  },

    /**
   * Retrieves the object details for a particular artwork
   *
   * @param {string} objectNumber The object number representing a particular artwork
   * @returns {Promise<{colors: [],
   * period: string,
   * imageurl: string,
   * title: string,
   * objectNumber: string,
   * longTitle: string,
   * maker: string,
   * description: string,
   * materials:[],
   * physicalMedium:string}>} A promise that resolves to an object that contains details about the artwork
   */

  getMuseumDetailsForObjectNumber(objectNumber) {
    return this._callRijksmuseumApiObjectDetail(objectNumber)
      .then(res => {
        if (!res.artObject || !res.artObject.webImage || res.artObject.webImage.url === "") return null;
        else {
          const { dating: { period }, webImage: { url }, objectNumber, title, longTitle, principalMaker: maker, colors, description, materials, physicalMedium } = res.artObject
          return {
            colors,
            period,
            imageurl: url,
            title,
            objectNumber,
            longTitle,
            maker,
            description,
            materials,
            physicalMedium
          }
        }
      })
  },

 /**
   * Call the Cloudinary API to post image
   *
   * @param {string} file The file name of the image to upload
   * @param {string} [method = post] The HTTP method
   * @returns {Promise<{}>} A promise that resolves to the results returned from API
   * @private
   */

  _callCloudinaryApi(file, method = 'post') {
    const config = {
      method
    };
    const cloudName = "rainysaturdayprojectskylab";
    const unsignedUploadPreset = "pvjxuw3w";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const fd = new FormData();
    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", file);

    if (method !== "get") {
      config.headers = {};
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      config.body = fd;
    }
    return fetch(url, config)
      .then(res => res.json())
      .then(res => {
        return res;
      });
  },

/**
   * Uploads an image to the Cloudinary API
   *
   * @param {string} file The file name of the image to upload
   * @returns {Promise<{}>} A promise the resolves to the response from the Cloudinary API
   */

  uploadCloudinaryImage(file) {
    // return this._callCloudinaryApi(file)
    return this._callCloudinaryApi(file)
  },

  /**
   * Retrieves the user favorites
   *
   * @returns {{objectNumber: string, imageurl: number}[]} The user favorites
   *
   */

  getUserFavorites() {
    return this._userFavorites
  },

};

if (typeof module !== 'undefined') module.exports = logic;