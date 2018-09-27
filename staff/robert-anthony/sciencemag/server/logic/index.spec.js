require('dotenv').config()

const {logic} = require('.')
const {expect} = require('chai')
const mongoose = require('mongoose')


const {env: {MONGO_URL}} = process


describe('logic', () => {
  let _connection

  before(() =>
    mongoose.connect(MONGO_URL, {useNewUrlParser: true})
      .then(conn => {

        return _connection = conn
      })
  )


  describe(' search', () => {

    it('should return content data for a string search', () => {
      return logic.search("content","fish")
        .then(res => {
          
          expect(res).to.equal("lkj")
        })
        .catch(err => {
          expect(err).to.equal("klj")
        })

    })

    it('should return content data for an or search', () => {
      return logic.search("content",["fish","dog"],"$in")
        .then(res => {
          expect(res).to.equal("lkj")
        })
        .catch(err => {
          expect(err).to.equal("klj")
        })

    })
    it('should return headline data for an or search', () => {
      return logic.search("headline",["fish","dog"],"$in")
        .then(res => {

          expect(res).to.equal("lkj")
        })
        .catch(err => {
          expect(err).to.equal("klj")
        })

    })


    it('should return headline data for an and search', () => {
      return logic.search("headline",["fish","dog"],"$and")
        .then(res => {
          debugger
          expect(res).to.equal("lkj")
        })
        .catch(err => {
          expect(err).to.equal("klj")
        })

    })

  })

  after(() =>
    _connection.disconnect())

})