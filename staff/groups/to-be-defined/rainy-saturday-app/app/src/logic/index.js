const logic = {
  // _userId: null,
  // _userToken: null,
  // _userUsername: null,
  set _userId(userId) {
    sessionStorage.setItem('userId', userId)
  },

  get _userId() {
    return sessionStorage.getItem('userId')
  },

  set _userToken(userToken) {
    sessionStorage.setItem('userToken', userToken)
  },

  get _userToken() {
    return sessionStorage.getItem('userToken')
  },

  set _userUsername(userUsername) {
    sessionStorage.setItem('userUsername', userUsername)
  },

  get userUsername() {
    return sessionStorage.getItem('userUsername')
  },

  set _userPassword(userPassword) {
    sessionStorage.setItem('userPassword', userPassword)
  },
  set _cloudinaryURL(cloudinaryURL) {
    console.log("set _cloudinaryURL", cloudinaryURL)
    sessionStorage.setItem('cloudinaryURL', cloudinaryURL)
  },

  get _userPassword() {
    return sessionStorage.getItem('userPassword')
  },

  set _userFavorites(userFavorites) {
    sessionStorage.setItem('userFavorites', JSON.stringify(userFavorites))
  },

  get _userFavorites() {
    return JSON.parse(sessionStorage.getItem('userFavorites')) || []
  },

  get _cloudinaryURL() {
    return sessionStorage.getItem('cloudinaryURL') || ""
  },

  get cloudinaryURL() {
    return this._cloudinaryURL;
  },

  get MUSEUM_MAKER_FILTER() {
    return "maker"
  },
  get MUSEUM_MATERIAL_FILTER() {
    return "material"
  },
  get MUSEUM_PERIOD_FILTER() {
    return "period"
  },


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

  logout() {
    this._userId = null
    this._userToken = null
    this._userUsername = null

    sessionStorage.clear()
  },

  get loggedIn() {
    return !!(this._userId && this._userToken && this.userUsername)
  },

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

  toggleImageFavorite(objectData) {
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

  isFavorite(objectNumber) {
    // return this._userFavorites.includes(objectNumber)
    return this._userFavorites.some(element => element.objectNumber === objectNumber)
  },

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



  _callRijksmuseumApiQuery(query) {
    const searchString = `https://www.rijksmuseum.nl/api/en/collection?key=${this.museumKey}&q=${query}&ps=100`;
    return fetch(searchString)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error('request error, status ' + res.error.status);

        return res;
      });
  },

  // TODO TESTING

  _callRijksmuseumApiObjectDetail(objectNumber) {
    const searchString = `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${this.museumKey}&format=json`;
    return fetch(searchString)
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error('request error, status ' + res.error.status);

        return res;
      });
  },


  searchMuseum: function (query) {
    return this._callRijksmuseumApiQuery(query)
      .then(res => {
        return res.artObjects
      })
  },
  //TODO TEST
  getMuseumImagesForSearchTerm(query) {
    return this._callRijksmuseumApiQuery(query.trim().replace(/ /g, "%20"))
      .then(res => {
        console.log(res)
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

  /*uploadFile(file) {

    const cloudName = "rainysaturdayprojectskylab"
    const unsignedUploadPreset = "rainysaturdayproject"

    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Reset the upload progress bar
    // document.getElementById('progress').style.width = 0;

    // Update progress (can be used to show progress indicator)
    // xhr.upload.addEventListener("progress", function(e) {
    //   var progress = Math.round((e.loaded * 100.0) / e.total);
    //   document.getElementById('progress').style.width = progress + "%";
    //
    //   console.log(`fileuploadprogress data.loaded: ${e.loaded},
    // data.total: ${e.total}`);
    // });

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        console.log(response, url)
      }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  },*/

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

  uploadCloudinaryImage(file) {
    // return this._callCloudinaryApi(file)
    return this._callCloudinaryApi(file)
  },

  getUserFavorites() {
    return this._userFavorites
  },


  /*
    getFilteredSearchTerm(searchTerm, filters) {

      const makerFilter = filters[this.MUSEUM_MAKER_FILTER]
      const periodFilter = filters[this.MUSEUM_PERIOD_FILTER]
      const materialFilter = filters[this.MUSEUM_MATERIAL_FILTER]

      const makerTerm = makerFilter ? `&principalMaker=${makerFilter.replace(/ /g, "%20")}` : "";
      const periodTerm = periodFilter ? `&f.dating.period=${periodFilter}` : "";
      const materialTerm = materialFilter ? `&material=${materialFilter.replace(/ /g, "%20")}` : "";

      return searchTerm + makerTerm + periodTerm + materialTerm
    }
  */


};

if (typeof module !== 'undefined') module.exports = logic;