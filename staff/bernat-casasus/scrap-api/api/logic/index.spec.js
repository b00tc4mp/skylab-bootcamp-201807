'use strict'

require('dotenv').config()

const { logic } = require('.')
const { MongoClient } = require('mongodb')

const { MONGO_URL } = process.env

describe('logic', () => {
    let _conn, _db, _flats

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            if (err) return done(err)

            _conn = conn

            const db = _db = conn.db()

            logic._flats = _flats = db.collection('flats')

            done()

        })
    })

        describe('filter by location', () => {
            const title = 'Piso en Roc Boronat'
            it('should filter flats by location',() =>{

                return logic.listByTitle(title)
                .catch(err => console.log(err))
                .then(expect(res).to.be.defined)
                
            }
        )
        })

        after(() => {
            _conn.close()
    })


})