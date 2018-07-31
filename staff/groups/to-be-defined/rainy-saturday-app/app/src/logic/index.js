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

  get _userPassword() {
    return sessionStorage.getItem('userPassword')
  },

  set _userFavorites(userFavorites) {
    sessionStorage.setItem('userFavorites', JSON.stringify(userFavorites))
  },

  get _userFavorites() {
    return JSON.parse(sessionStorage.getItem('userFavorites')) || []
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

  registerUser(username, password) {
    return this._callUsersApi('/user', 'post', {username, password})
      .then(res => res.data.id)
  },

  loginUser(username, password) {
    return this._callUsersApi('/auth', 'post', {username, password})
      .then(({data: {id, token}}) => {
        this._userId = id
        this._userToken = token
        this._userUsername = username
        this._userPassword = password // IDEAL encrypt it!

        // return true
        return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
      })
      .then(({data}) => {
        this._userFavorites = data.favorites || []

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
    return this._userId && this._userToken && this.userUsername
  },

  updateUser(password, newUsername, newPassword) {
    const data = {
      username: this.userUsername,
      password
    }

    if (newUsername) data.newUsername = newUsername

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

  toggleTrackFavorite(trackId) {
    const favorites = this._userFavorites

    const index = favorites.indexOf(trackId)

    if (index > -1) {
      favorites.splice(index, 1)
    } else {
      favorites.push(trackId)
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

  isFavorite(trackId) {
    return this._userFavorites.includes(trackId)
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

// TODO TESTING
  getMuseumDetailsForObjectNumber(objectNumber) {
    return this._callRijksmuseumApiObjectDetail(objectNumber)
      .then(res => {
        if (!res.artObject.webImage || res.artObject.webImage.url === "") return null;
        else {
          const {dating: {period}, webImage: {url} ,objectNumber,title, longTitle, principalMaker: maker, colors, description, materials, physicalMedium} = res.artObject
          return {colors, period, imageurl: url, title, objectNumber, longTitle, maker, description, materials, physicalMedium}
        }
      })
  },

  getFilteredSearchTerm(searchTerm, filters) {

    const makerFilter = filters[this.MUSEUM_MAKER_FILTER]
    const periodFilter = filters[this.MUSEUM_PERIOD_FILTER]
    const materialFilter = filters[this.MUSEUM_MATERIAL_FILTER]

    const makerTerm = makerFilter ? `&principalMaker=${makerFilter.replace(/ /g, "%20")}` : "";
    const periodTerm = periodFilter ? `&f.dating.period=${periodFilter}` : "";
    const materialTerm = materialFilter ? `&material=${materialFilter.replace(/ /g, "%20")}` : "";

    return searchTerm + makerTerm + periodTerm + materialTerm
  }

  // spotify's

//     searchArtists: function (query) {
//         return this._callSpotifyApi('/search?type=artist&query=' + query)
//             .then(res => res.artists.items)
//     },

//     retrieveAlbumsByArtistId(id) {
//         return this._callSpotifyApi('/artists/' + id + '/albums')
//             .then(res => res.items)
//     },

//     retrieveTracksByAlbumId(id) {
//         return this._callSpotifyApi('/albums/' + id + '/tracks')
//             .then(res => res.items)
//     },

//     retrieveTrackById(id) {
//         return this._callSpotifyApi('/tracks/' + id)
//     }
};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;