'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')

const { MONGO_URL } = process.env
const { logic } = require('../.')
const { expect } = require('chai')

describe('data', () => {
    const username = 'juan' + Math.random(), password = '123'
    let _conn, _db, _users, _id, _data

    before(done => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
            if (err) return done(err)
            _conn = conn
            const db = _db = conn.db()
            logic._users = _users = db.collection('users')
            done()
        })
    })
    after(() => {
        return _conn.close()
    })

    describe('save data', () => {

        beforeEach(() => {
            _data = {
                'test-array': [1, 2, 'hello', { a: 'a', b: 'b' }],
                'test-string': 'hello2',
                'test-object': { p1: 'p1', p2: [1, 2, 3] },
                'test-number': 123
            }
            return _users.insertOne({ username, password })
                .then(() => logic.authenticate(username, password))
                .then(id => _id = id.toString())
        })
        afterEach(() => {
            return _users.deleteMany()
        })

        it('should save data', () => {
            return logic.save(_id, _data)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    
        it('should fail on empty data', () => {
            return logic.save(_id)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on empty object data', () => {
            return logic.save(_id, {})
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on string data', () => {
            return logic.save(_id, 'hello')
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on empty string data', () => {
            return logic.save(_id, '')
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on numeric data', () => {
            return logic.save(_id, 123)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on null data', () => {
            return logic.save(_id, null)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on boolean data', () => {
            return logic.save(_id, true)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('empty data')
                })
        })
    
        it('should fail on emptyid', () => {
            return logic.save(undefined, _data)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('invalid id')
                })
        })
    
        it('should fail on empty string id', () => {
            return logic.save('', _data)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('invalid id')
                })
        })
    
        it('should fail on numeric id', () => {
            return logic.save(123, _data)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('invalid id')
                })
        })
    })

    describe('retrieve data', () => {

        beforeEach(() => {
            _data = {
                'test-array': [1, 2, 'hello', { a: 'a', b: 'b' }],
                'test-string': 'hello2',
                'test-object': { p1: 'p1', p2: [1, 2, 3] },
                'test-number': 123
            }
            return _users.insertOne({ username, password })
                .then(() => logic.authenticate(username, password))
                .then(id => _id = id.toString())
        })
        afterEach(() => {
            return _users.deleteMany()
        })

        it('should retrieve data correctly', () => {
            return _users.findOne(ObjectId(_id))
                .then(() => _users.updateOne({ _id: ObjectId(_id) }, { $set: { data: _data } }))
                .then(() => logic.retrieve(_id))
                .then(data => expect(data).to.deep.equal(_data))
        })

        it('should fail on empty id', () => {
            return logic.retrieve()
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('invalid id')
                })
        })
    
        it('should fail on empty string id', () => {
            return logic.retrieve('')
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('invalid id')
                })
        })

        it('should fail on numeric id', () => {
            return logic.retrieve(123)
                .catch(({ message }) => message)
                .then(message => {
                    expect(message).to.equal('invalid id')
                })
        })

    })
   
})