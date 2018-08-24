const mongoose = require('mongoose')
const {Types: {ObjectId}} = mongoose
const {Article} = require('./data/models')


module.exports = {

  save(data) {
    const promises = []
    for (let i = 0; i < data.length; i++) {
      console.log(i)
      const article = new Article(data[i])
      promises.push(article.save())
    }

    return Promise.all(promises)
  }

}