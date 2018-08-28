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
    required:true
  },
  terminated: {
    type:Boolean,
    default:false,
    required:true
  },
  winner: {
    type:String,
    required:true
  },
})