const {Schema} = require('mongoose')

function validatePassword(password) {
  if (password.length < 6) throw Error('password length is too short')
}

module.exports = new Schema({
  email: {
    type: String,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true
  },

  password: {
    type: String,
    required: true,
    validate: validatePassword
  },

  nickname: {
    type: String,
    required: true
  },
  lastRequest:{
    type:String,
    required:allowEmpty
  },

  lastRequestResponse:{
    type:String,
    required:allowEmpty
  },

  online: {
    type: Boolean,
    required: true,
    default: false
  }


})

function allowEmpty () {
  return typeof this.lastRequest !== 'string'
}