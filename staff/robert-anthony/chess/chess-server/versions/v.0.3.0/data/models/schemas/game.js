const {Schema} = require('mongoose')

module.exports = new Schema({

  white:  {
    type:String,
    required:true
},
  black:  {
    type:String,
    required:true
  },
  engineID: {
    type:String,
    default:"",
    required:true,
    unique:true
  },
  pgn: {
    type:String,
    required:isString
  },
  winner: {
    type:String,
    required:isString
  },
  lastMove: {
    type:String,
    required:isString
  },
})


function isString () {
  return typeof this.pgn !== 'string'
}