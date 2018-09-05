require('dotenv').config()

const {logic} = require('.')
const {expect} = require('chai')
const mongoose = require('mongoose')
const {Types: {ObjectId}} = mongoose
const {User} = require('../data/models')
const {Game} = require('../data/models')
const {Chess} = require('chess.js')
const uuidv1 = require('uuid/v1');
const randomEmail = require('random-email');
const {env: {MONGO_URL}} = process

describe('logic', () => {
  const email = `blippy-${Math.random()}@mail.com`, password = `123-${Math.random()}`,
    nickname = `blippy-${Math.random()}`
  const email2 = `bloopy-${Math.random()}@mail.com`, nickname2 = `bloopy-${Math.random()}`
  let _connection
  let usersCount = 0
  let users = []
  let engines = new Map

  before(() =>
    mongoose.connect(MONGO_URL, {useNewUrlParser: true})
      .then(conn => _connection = conn)
  )

  beforeEach(() =>
    Promise.all([
      User.deleteMany()
    ])
      .then(_ => Promise.all([
        Game.deleteMany()
      ]))
      .then(() => {
        engines = new Map
        let count = Math.floor(Math.random() * 100)

        const creations = []

        while (count--) creations.push({
          nickname: `other-${Math.random()}`,
          email: `other-${Math.random()}@mail.com`,
          password: `123-${Math.random()}`
        })
        users = creations.slice()
        if (usersCount = creations.length)
          return User.create(creations)
      })
      .then(() => {
        const creations = []
        for (let i = 0; i < (users.length / 2) - 1; i++) {
          let engine = new Chess()
          let uuid = uuidv1()
          engines.set(uuid, engine)
          let pgn = engine.pgn()
          creations.push({
            initiator: users[i].nickname,
            acceptor: users[users.length - i - 1].nickname,
            engineID: uuid,
            pgn,
            winner: "",
            lastMove: "",
            state: "invited",
            toPlay: users[i].nickname,
            inCheck: false,
            inDraw: false,
            inStalemate: false,
            inCheckmate: false,
            inThreefoldRepetition: false,
            insufficientMaterial: false,
            hasAcknowledgedGameOver: [],
          })
        }
        if (creations.length)
          return Game.create(creations)
      })
  )


  describe('validate fields', () => {
    it('should succeed on correct value', () => {
      expect(() => logic._validateStringField('email', email).to.equal(email))
      expect(() => logic._validateStringField('password', password).to.equal(password))
    })

    it('should fail on undefined value', () => {
      expect(() => logic._validateStringField('name', undefined)).to.throw(`invalid name`)
    })

    it('should fail on empty value', () => {
      expect(() => logic._validateStringField('name', '')).to.throw(`invalid name`)
    })

    it('should fail on numeric value', () => {
      expect(() => logic._validateStringField('name', 123)).to.throw(`invalid name`)
    })
  })

  describe('register user', () => {
    it('should register correctly', () =>
      User.findOne({nickname})
        .then(user => {
          expect(user).to.be.null

          return logic.register(email, password, nickname)
        })
        .then(res => {
          expect(res).to.be.true

          return User.findOne({nickname})
        })
        .then(user => {
          expect(user).to.exist
          expect(user.email).to.equal(email)
          expect(user.password).to.equal(password)
          expect(user.nickname).to.equal(nickname)

          return User.find()
        })
        .then(users => expect(users.length).to.equal(usersCount + 1))
    )

    it('should fail on trying to register an already registered email', () =>
      User.create({email, password, nickname})
        .then(() => logic.register(email, password, nickname2))
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`user with ${email} email already exists`))
    )

    it('should fail on trying to register an already registered nickname', () =>
      User.create({email, password, nickname})
        .then(() => logic.register(email2, password, nickname))
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`user with ${nickname} nickname already exists`))
    )

    it('should fail on trying to register with an undefined email', () =>
      logic.register(undefined, password, nickname)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to register with an empty email', () =>
      logic.register('', password, nickname)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to register with an empty nickname', () =>
      logic.register(email, password, '')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )
    it('should fail on trying to register with an undefined nickname', () =>
      logic.register(email, password, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail on trying to register with a numeric nickname', () =>
      logic.register(email, password, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail on trying to register with a numeric email', () =>
      logic.register(123, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to register with an undefined password', () =>
      logic.register(email, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to register with an empty password', () =>
      logic.register(email, '')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to register with a numeric password', () =>
      logic.register(email, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )
  })

  describe('authenticate user', () => {
    beforeEach(() => User.create({email, password, nickname}))

    it('should login correctly', () =>
      logic.authenticate(nickname, password)
        .then(res => {
          expect(res).to.be.true
        })
    )

    it('should fail on trying to login with an undefined nickname', () =>
      logic.authenticate(undefined, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail on trying to login with an empty nickname', () =>
      logic.authenticate('', password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail on trying to login with a numeric nickname', () =>
      logic.authenticate(123, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail on trying to login with an undefined password', () =>
      logic.authenticate(nickname, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to login with an empty password', () =>
      logic.authenticate(nickname, '')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to login with a numeric password', () =>
      logic.authenticate(nickname, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )
  })

  false && describe('update user', () => {
    const newPassword = `${password}-${Math.random()}`

    beforeEach(() => User.create({email, password}))

    it('should update password correctly', () =>
      logic.updatePassword(email, password, newPassword)
        .then(res => {
          expect(res).to.be.true

          return User.findOne({email})
        })
        .then(user => {
          expect(user).to.exist
          expect(user.email).to.equal(email)
          expect(user.password).to.equal(newPassword)
        })
    )

    it('should fail on trying to update password with an undefined email', () =>
      logic.updatePassword(undefined, password, newPassword)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to update password with an empty email', () =>
      logic.updatePassword('', password, newPassword)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to update password with a numeric email', () =>
      logic.updatePassword(123, password, newPassword)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to update password with an undefined password', () =>
      logic.updatePassword(email, undefined, newPassword)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to update password with an empty password', () =>
      logic.updatePassword(email, '', newPassword)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to update password with a numeric password', () =>
      logic.updatePassword(email, 123, newPassword)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to update password with an undefined new password', () =>
      logic.updatePassword(email, password, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid new password`))
    )

    it('should fail on trying to update password with an empty new password', () =>
      logic.updatePassword(email, password, '')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid new password`))
    )

    it('should fail on trying to update password with a numeric new password', () =>
      logic.updatePassword(email, password, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid new password`))
    )
  })

  false && describe('unregister user', () => {
    beforeEach(() => User.create({email, password}))

    it('should unregister user correctly', () =>
      logic.unregisterUser(email, password)
        .then(res => {
          expect(res).to.be.true

          return User.findOne({email})
        })
        .then(user => {
          expect(user).not.to.exist
        })
    )

    it('should fail on trying to unregister user with an undefined email', () =>
      logic.unregisterUser(undefined, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to unregister user with an empty email', () =>
      logic.unregisterUser('', password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to unregister user with a numeric email', () =>
      logic.unregisterUser(123, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to unregister user with an undefined password', () =>
      logic.unregisterUser(email, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to unregister user with an empty password', () =>
      logic.unregisterUser(email, '')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to unregister user with a numeric password', () =>
      logic.unregisterUser(email, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )
  })

  describe('get games for user', () => {
    beforeEach(async () => {
      await User.create({email, password, nickname})
      await User.create({email: email2, password, nickname: nickname2})

      for (let i = 0; i < 3; i++) {
        let engine = new Chess()
        let uuid = uuidv1()
        engines.set(uuid, engine)
        let pgn = engine.pgn()

        await Game.create({
          initiator: nickname,
          acceptor: `blippy-${i}`,
          engineID: uuid,
          pgn,
          winner: "",
          lastMove: "",
          state: "invited",
          toPlay: nickname,
          inCheck: false,
          inDraw: false,
          inStalemate: false,
          inCheckmate: false,
          inThreefoldRepetition: false,
          insufficientMaterial: false,
          hasAcknowledgedGameOver: [],
        })
      }
    })

    it('should get games correctly', () =>
      logic.getGamesForUser(nickname)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(3)
          expect(res[0].initiator).to.equal(nickname)
          expect(res[1].initiator).to.equal(nickname)
          expect(res[2].initiator).to.equal(nickname)
          expect(res[0].acceptor).to.equal('blippy-0')
          expect(res[1].acceptor).to.equal('blippy-1')
          expect(res[2].acceptor).to.equal('blippy-2')
          expect(res[0].state).to.equal('invited')
          expect(res[1].state).to.equal('invited')
          expect(res[2].state).to.equal('invited')
        })
    )


    it('should return empty array when no games exist for user', () =>
      logic.getGamesForUser(nickname2)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(0)
        })
    )

    it('should fail for empty nickname', () =>
      logic.getGamesForUser('')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for undefined nickname', () =>
      logic.getGamesForUser(undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for numeric nickname', () =>
      logic.getGamesForUser(1234)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


  })


  describe('user connected', () => {
    beforeEach(async () => {
      await User.create({email, password, nickname})
    })

    it('should succeed on existing user', () =>
      logic.userConnected(nickname)
        .then(res => {
          expect(res).to.be.true
        })
    )

    it('should fail for non-existing user', () =>
      logic.userConnected('george beauregard')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`user with george beauregard nickname does not exist`))
    )

    it('should fail for undefined nickname', () =>
      logic.userConnected(undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail for missing nickname', () =>
      logic.userConnected('')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail for numeric nickname', () =>
      logic.getGamesForUser('')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


  })


  describe('get users for string', () => {
    const nickname0 = "abcdefg"
    const nicknameA = "Abracadabra"
    const nicknameB = "baldroSa"
    const nicknameC = "¢”#≠”¢"

    beforeEach(async () => {
      await User.create({email:randomEmail({ domain: 'example.com' }), password, nickname:nickname0})
      await User.create({email:randomEmail({ domain: 'example.com' }), password, nickname: nicknameA})
      await User.create({email: randomEmail({ domain: 'example.com' }), password, nickname: nicknameB})
      await User.create({email: randomEmail({ domain: 'example.com' }), password, nickname: nicknameC})
    })

    it('should return correct users for one letter string', () =>
      logic.getUsersForString(nickname0,'a')
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(2)
          expect(res[0]).to.equal(nicknameA)
          expect(res[1]).to.equal(nicknameB)
        })
    )

    it('should return correct users for multi letter string', () =>
      logic.getUsersForString(nickname0,'cadab')
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(1)
          expect(res[0]).to.equal(nicknameA)
        })
    )

    it('should return empty array for empty string', () =>
      logic.getUsersForString(nickname0,'')
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(0)
        })
    )

    it('should return empty array for wrong character string', () =>
      logic.getUsersForString(nickname0,'xxx')
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(0)
        })
    )

    it('should fail for numeric term', () =>
      logic.getUsersForString(nickname0,123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`search term is not a string`))
    )

    it('should fail for missing nickname', () =>
      logic.getUsersForString('','a')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for undefined nickname', () =>
      logic.getUsersForString(undefined,'a')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for numeric nickname', () =>
      logic.getUsersForString(123,'a')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )



  })


  after(() =>
    Promise.all([
      User.deleteMany()
    ])
      .then(_ => Promise.all([
        Game.deleteMany()
      ]))
      .then(() => _connection.disconnect())
  )
})