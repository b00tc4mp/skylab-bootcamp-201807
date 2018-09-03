const {Schema} = require('mongoose')

module.exports = new Schema({

  initiator:  {
    type:String,
    required:true
},
  acceptor:  {
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
    required:pgnString
  },
  fen: {
    type:String,
    required:fenString
  },
  winner: {
    type:String,
    required:winnerString
  },
  lastMove: {
    type:String,
    required:lastMoveString
  },
  state: {
    type:String,
    required:true,
    default:"invited",
    enum: ['invited', 'playing','terminated'],
  },
  toPlay: {
    type:String,
    required:true,
  },
  inCheck: {
    type:Boolean,
    required:true,
    default:false
  },
  inDraw: {
    type:Boolean,
    required:true,
    default:false
  },
  inStalemate: {
    type:Boolean,
    required:true,
    default:false
  },
  inCheckmate: {
    type:Boolean,
    required:true,
    default:false
  },
  inThreefoldRepetition: {
    type:Boolean,
    required:true,
    default:false
  },
  insufficientMaterial: {
    type:Boolean,
    required:true,
    default:false
  },
  hasAcknowledgedGameOver: {
    type:Array,
    required:true
  }
})


function reasonForWinString () {
  return typeof this.reasonForWin !== 'string'
}

function pgnString () {
  return typeof this.pgn !== 'string'
}

function fenString () {
  return typeof this.pgn !== 'string'
}

function winnerString () {
  return typeof this.winner !== 'string'
}
function lastMoveString () {
  return typeof this.lastMove !== 'string'
}