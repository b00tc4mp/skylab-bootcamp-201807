'use strict'

const axios = require('axios')

module.exports = {

  getit(path) {


    return axios.get(path)
      .then(res => {

        return res.data
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          return error.response
        } else if (error.message) {

          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return error.message;
        } else {

          // Something happened in setting up the request that triggered an Error
          return error.message;
        }
      })
  },


  fetchSiteData(path) {

  return   this.getit(path, "GET", {'Content-Type': 'application/json'}, undefined, 200)
      .then(res => {
        return res
      })


  }

}