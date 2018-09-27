const {Article} = require('../../scraper/data/models')


const logic = {

// de Mozilla


  escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  },

  search(field,term, searchType = "$in") {
    let arr = []
    if (typeof term === 'string') {
      term = this.escapeRegExp(term)

      arr.push(new RegExp(term,'i'))
    } else if (term instanceof Array ) {
      term = term.map(_term => {
        _term = this.escapeRegExp(_term)
        return new RegExp(_term,'i')
      })
      arr = term
    }

    let searchObject = {}
    searchObject[searchType] = arr

   // return Article.find(  { "content": { "$regex": new RegExp(term), "$options": "i" } }).lean()
    return Article.find(  { [field]: { $in : arr} }).lean()
   // return Article.find({content: {$in: [/fish/i,/dog/i]}}).lean()
      .then(res=>{
        return res})
      .catch(err=>{
        return err})

    }


  }


class LogicError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {logic, LogicError}