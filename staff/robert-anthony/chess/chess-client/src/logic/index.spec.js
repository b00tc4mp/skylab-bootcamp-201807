require('dotenv').config()
require('isomorphic-fetch')

const logic = require('.')
const {expect} = require('chai')
const {mongoose, models: {User, Game}} = require('chess-data')
const {Types: {ObjectId}} = mongoose
const {Chess} = require('chess.js')
const uuidv1 = require('uuid/v1');
const randomEmail = require('random-email');
const {env: {MONGO_URL, JWT_SECRET}} = process
const jwt = require('jsonwebtoken')
const fetchMock = require('fetch-mock');


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

          return logic.register(email, nickname, password)
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
        .then(() => logic.register(email, nickname2, password))
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`user with ${email} email already exists`))
    )

    it('should fail on trying to register an already registered nickname', () =>
      User.create({email, password, nickname})
        .then(() => logic.register(email2, nickname, password))
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`user with ${nickname} nickname already exists`))
    )

    it('should fail on trying to register with an undefined email', () =>
      logic.register(undefined, nickname, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to register with an empty email', () =>
      logic.register('', nickname, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to register with an empty nickname', () =>
      logic.register(email, '', password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )
    it('should fail on trying to register with an undefined nickname', () =>
      logic.register(email, undefined, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail on trying to register with a numeric nickname', () =>
      logic.register(email, 123, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail on trying to register with a numeric email', () =>
      logic.register(123, nickname, password)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid email`))
    )

    it('should fail on trying to register with an undefined password', () =>
      logic.register(email, nickname, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to register with an empty password', () =>
      logic.register(email, nickname, '')
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )

    it('should fail on trying to register with a numeric password', () =>
      logic.register(email, nickname, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid password`))
    )
  })

  describe('authenticate user', () => {
    beforeEach(() => User.create({email, password, nickname}))

    it('should login correctly', () =>
      logic.authenticate(nickname, password)
        .then(token => {
          expect(token).to.be.a('string')

          let payload

          expect(() => payload = jwt.verify(token, JWT_SECRET)).not.to.throw()
          expect(payload.sub).to.equal(nickname)
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


  describe('get games for user', () => {

    let token, token2
    beforeEach(async () => {

      await User.create({email, password, nickname})
      await User.create({email: email2, password, nickname: nickname2})
      token = await logic.authenticate(nickname, password)
      token2 = await logic.authenticate(nickname2, password)
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
      logic.getGamesForUser(nickname, token)
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
      logic.getGamesForUser(nickname2, token2)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(0)
        })
    )

    it('should fail for empty nickname', () =>
      logic.getGamesForUser('', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for undefined nickname', () =>
      logic.getGamesForUser(undefined, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for numeric nickname', () =>
      logic.getGamesForUser(1234, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail for wrong token', () =>
      logic.getGamesForUser(nickname, token2)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for bad token', () =>
      logic.getGamesForUser(nickname, "12345")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`jwt malformed`))
    )

    it('should fail for empty token', () =>
      logic.getGamesForUser(nickname, "")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for undefined token', () =>
      logic.getGamesForUser(nickname, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for numeric token', () =>
      logic.getGamesForUser(nickname, 123456)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )



  })


  describe('get users for string', () => {
    const nickname0 = "Abcedgh"
    const nicknameA = "Abracadabra"
    const nicknameB = "baldroSa"
    const nicknameC = "¢”#≠”¢"

    beforeEach(async () => {

      await User.create({email: "hoppy" + Math.random() + "@somewhere.com" , password, nickname: nickname0})
      await User.create({email: "hoppy" + Math.random() + "@somewhere.com", password, nickname: nicknameA})
      await User.create({email: "hoppy" + Math.random() + "@somewhere.com", password, nickname: nicknameB})
      await User.create({email: "hoppy" + Math.random() + "@somewhere.com", password, nickname: nicknameC})
      token = await logic.authenticate(nickname0, password)
      token2 = await logic.authenticate(nicknameA, password)

    })

    it('should return correct users for one letter string', () =>
      logic.getUsersForString(nickname0, 'a', token)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(2)
          expect(res[0]).to.equal(nicknameA)
          expect(res[1]).to.equal(nicknameB)
        })
    )

    it('should return correct users for multi letter string', () =>
      logic.getUsersForString(nickname0, 'cadab', token)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(1)
          expect(res[0]).to.equal(nicknameA)
        })
    )



    it('should fail for wrong token', () =>
      logic.getUsersForString(nickname0, 'cadab', token2)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for bad token', () =>
      logic.getUsersForString(nickname0, 'cadab', "12345")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`jwt malformed`))
    )

    it('should fail for empty token', () =>
      logic.getUsersForString(nickname0, 'cadab', "")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for undefined token', () =>
      logic.getUsersForString(nickname0, 'cadab', undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for numeric token', () =>
      logic.getUsersForString(nickname0, 'cadab', 12345)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should return empty array for empty string', () =>
      logic.getUsersForString(nickname0, '', token)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(0)
        })
    )

    it('should return empty array for wrong character string', () =>
      logic.getUsersForString(nickname0, 'xxx', token)
        .then(res => {
          expect(res).to.be.an('array')
          expect(res.length).to.equal(0)
        })
    )

    it('should fail for numeric term', () =>
      logic.getUsersForString(nickname0, 123, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid str`))
    )

    it('should fail for missing nickname', () =>
      logic.getUsersForString('', 'a', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for undefined nickname', () =>
      logic.getUsersForString(undefined, 'a', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for numeric nickname', () =>
      logic.getUsersForString(123, 'a', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )
  })

  describe('acknowledge game over for user', () => {

    const email1 = "hoppy" + Math.random() + "@somewhere.com"
    const email2 = "hoppy" + Math.random() + "@somewhere.com"
    let game0State, game1State


    beforeEach(async () => {
      await User.create({email: email1, password, nickname: nickname})
      await User.create({email: email2, password, nickname: nickname2})
      token = await logic.authenticate(nickname, password)
      token2 = await logic.authenticate(nickname2, password)

      let engine = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3') // game in checkmate
      let uuid = uuidv1()
      engines.set(uuid, engine)
      let pgn = engine.pgn()
      game0State = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: "",
        state: "playing",
        toPlay: nickname,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
      engine = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3') // game in checkmate
      uuid = uuidv1()
      engines.set(uuid, engine)
      pgn = engine.pgn()
      game1State = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: "",
        state: "playing",
        toPlay: nickname,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [nickname],
      })
    })


    it('should succeed for correct nickname and gameID with game having 0 acknowledgements', () =>
      logic.onAcknowledgeGameOver(nickname, game0State.id, token)
        .then(res => {
          expect(res).to.deep.equal({message: 'game terminated'})
          return Game.findOne({_id: game0State._id})
        })
        .then(game => {
          const engine = engines.get(game.engineID)
          expect(engine).to.exist
          expect(game.hasAcknowledgedGameOver.length).to.equal(1)
          expect(game.hasAcknowledgedGameOver[0]).to.equal(nickname)
          expect(game.state).to.equal('playing')
        })
    )


    it('should succeed for correct nickname and gameID with game having 1 acknowledgement', () =>
      logic.onAcknowledgeGameOver(nickname2, game1State.id, token2)
        .then(res => {
          expect(res).to.deep.equal({message: 'game terminated'})
          return Game.findOne({_id: game1State._id})
        })
        .then(game => {
          const engine = engines.get(game.engineID)
          expect(engine).to.exist
          expect(game.hasAcknowledgedGameOver.length).to.equal(2)
          expect(game.hasAcknowledgedGameOver[0]).to.equal(nickname)
          expect(game.hasAcknowledgedGameOver[1]).to.equal(nickname2)
          expect(game.state).to.equal('terminated')
        })
    )



    it('should fail for wrong token', () =>
      logic.onAcknowledgeGameOver(nickname2, game1State.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for bad token', () =>
      logic.onAcknowledgeGameOver(nickname2, game1State.id, "abcdefg")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`jwt malformed`))
    )

    it('should fail for empty token', () =>
      logic.onAcknowledgeGameOver(nickname2, game1State.id, "")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for undefined token', () =>
      logic.onAcknowledgeGameOver(nickname2, game1State.id, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for numeric token', () =>
      logic.onAcknowledgeGameOver(nickname2, game1State.id, 12345)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for incorrect nickname ', () =>
      logic.onAcknowledgeGameOver("georgeJones", game0State.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for missing nickname ', () =>
      logic.onAcknowledgeGameOver("", game0State.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for undefined nickname ', () =>
      logic.onAcknowledgeGameOver(undefined, game0State.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for numeric nickname ', () =>
      logic.onAcknowledgeGameOver(123, game0State.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )
    it('should fail for incorrect gameID', () => {
        const id = new ObjectId().toString()
        return logic.onAcknowledgeGameOver(nickname, id, token)
          .catch(err => err)
          .then(({message}) => expect(message).to.equal(`game with id ${id} does not exist`))
      }
    )
    it('should fail for missing gameID', () =>
      logic.onAcknowledgeGameOver(nickname, '', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    )
    it('should fail for undefined gameID', () =>
      logic.onAcknowledgeGameOver(nickname, undefined, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    )
    it('should fail for numeric gameID', () =>
      logic.onAcknowledgeGameOver(nickname, 123434, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    )
  }) // end describe acknowledge game over for user

  describe('make a game move', () => {

    const email1 = "hoppy" + Math.random() + "@somewhere.com"
    const email2 = "hoppy" + Math.random() + "@somewhere.com"
    const badName = "buddy"

    let gameInProgress, gameInCheckmate, gameOneBeforeCheckmate, gameOneBeforeStalemate, gameNotInCheck
    let badGameID

    beforeEach(async () => {

      badGameID = (new ObjectId()).toString()

      await User.create({email: email1, password, nickname: nickname})
      await User.create({email: email2, password, nickname: nickname2})
      token = await logic.authenticate(nickname, password)
      token = await logic.authenticate(nickname2, password)

      let engine = new Chess() // game in progress
      let uuid = uuidv1()
      engines.set(uuid, engine)
      let pgn = engine.pgn()
      gameInProgress = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: "",
        state: "playing",
        toPlay: nickname,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
      engine = new Chess('rnbqkbnr/pppp1ppp/8/4p3/5PP1/8/PPPPP2P/RNBQKBNR b KQkq g3 0 2') // game in progress one before checkmate
      uuid = uuidv1()
      engines.set(uuid, engine)
      pgn = engine.pgn()
      gameOneBeforeCheckmate = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: "",
        state: "playing",
        toPlay: nickname2,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
      engine = new Chess('rnbqkbnr/ppp2ppp/8/3pp3/3P4/3Q4/PPP1PPPP/RNB1KBNR w KQkq e6 0 3') // game not in check
      uuid = uuidv1()
      engines.set(uuid, engine)
      pgn = engine.pgn()
      gameNotInCheck = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: "",
        state: "playing",
        toPlay: nickname,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
      engine = new Chess('4k3/4P3/8/4K3/8/8/8/8 w - - 0 1') // game one before stalemate
      uuid = uuidv1()
      engines.set(uuid, engine)
      pgn = engine.pgn()
      gameOneBeforeStalemate = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: "",
        state: "playing",
        toPlay: nickname,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
      engine = new Chess('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3') // game in checkmate
      uuid = uuidv1()
      engines.set(uuid, engine)
      pgn = engine.pgn()
      gameInCheckmate = await Game.create({
        initiator: nickname,
        acceptor: nickname2,
        engineID: uuid,
        pgn,
        winner: nickname2,
        state: "playing",
        toPlay: nickname,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: true,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
      logic._currentEngines = engines
    })

    //makeAGameMove(nickname, move, gameID, token) {

    it('should succeed for correct nickname, move and gameID with game in progress', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname}/game/${gameInProgress.id}`, {
            "status": 200,
            "message": "successful move"
          })
          return logic.makeAGameMove(nickname, {
            from: "e2",
            to: "e4",
            promotion: "q"
          }, gameInProgress.id, token)
        })
        .then(res => {
          const {message} = res
          expect(message).to.equal('successful move')
          //   fetchMock.restore()
        })
    )



    it('should fail for wrong token', () =>
      logic.makeAGameMove(nickname, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, token2)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for bad token', () =>
      logic.makeAGameMove(nickname, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, "12345")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`jwt malformed`))
    )

    it('should fail for empty token', () =>
      logic.makeAGameMove(nickname, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, "")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for undefined token', () =>
      logic.makeAGameMove(nickname, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for numeric token', () =>
      logic.makeAGameMove(nickname, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, 11324)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )


    it('should succeed for game one before check with correct nickname, move and gameID with game in progress', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname}/game/${gameNotInCheck.id}`, {
            "status": 200,
            "message": "successful move"
          })
          return logic.makeAGameMove(nickname, {
            from: "d3",
            to: "b5",
            promotion: "q"
          }, gameNotInCheck.id, token)
        })
        .then(res => {
          const {message} = res
          expect(message).to.equal('successful move')
          //  fetchMock.restore()
        })
    )

    it('should fail for correct nickname, move and gameID with impossible move with game in progress', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname}/game/${gameInProgress.id}`, {
            "status": 400,
            "message": "move is not allowed"
          })
          return logic.makeAGameMove(nickname, {
            from: "e2",
            to: "e6",
            promotion: "q"
          }, gameInProgress.id, token)
        })
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`move is not allowed`))
    )

    it('should fail when game is over (in checkmate) for correct nickname, move and gameID', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname}/game/${gameInCheckmate.id}`, {
            "status": 400,
            "message": "game is over, cannot move"
          })
          return logic.makeAGameMove(nickname, {
            from: "e2",
            to: "e4",
            promotion: "q"
          }, gameInCheckmate.id, token)
        })
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`game is over, cannot move`))
    )

    it('should succeed when game is one move before checkmate for correct nickname, move and gameID with game in progress', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname2}/game/${gameOneBeforeCheckmate.id}`, {
            "status": 200,
            "message": "successful move"
          })
          return logic.makeAGameMove(nickname2, {
            from: "d8",
            to: "h4",
            promotion: "q"
          }, gameOneBeforeCheckmate.id, token)
        })
        .then(res => {
          const {message} = res
          expect(message).to.equal('successful move')
        })
    )


    it('should succeed when game is one move before stalemate for correct nickname, move and gameID with game in progress', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname}/game/${gameOneBeforeStalemate.id}`, {
            "status": 200,
            "message": "successful move"
          })
          return logic.makeAGameMove(nickname, {
            from: "e5",
            to: "e6",
            promotion: "q"
          }, gameOneBeforeStalemate.id, token)
        })
        .then(res => {
          const {message} = res
          expect(message).to.equal('successful move')
        })
    )

    it('should fail for correct nickname, move and bad gameID', () =>
      Promise.resolve()
        .then(_ => {
          fetchMock.post(`http://localhost:8080/api/user/${nickname}/game/${badGameID}`, {
            "status": 400,
            "message": `game with id ${badGameID} does not exist`
          })
          return logic.makeAGameMove(nickname, {from: "e2", to: "e4", promotion: "q"}, badGameID, token)
        })
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`game with id ${badGameID} does not exist`))
    )

    it('should fail for correct nickname, move and missing gameID', () =>
      logic.makeAGameMove(nickname, {from: "e2", to: "e4", promotion: "q"}, '', token)

        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    )

    it('should fail for correct nickname, move and undefined gameID', () =>
      logic.makeAGameMove(nickname, {from: "e2", to: "e4", promotion: "q"}, undefined, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    )

    it('should fail for correct nickname, move and numeric gameID', () =>
      logic.makeAGameMove(nickname, {from: "e2", to: "e4", promotion: "q"}, 123, token)

        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    )


    it('should fail for correct move, gameID and bad nickname', () =>
      logic.makeAGameMove(badName, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for correct move, gameID and missing nickname', () =>
      logic.makeAGameMove("", {from: "e2", to: "e4", promotion: "q"}, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )
    it('should fail for correct move, gameID and undefined nickname', () =>
      logic.makeAGameMove(undefined, {
        from: "e2",
        to: "e4",
        promotion: "q"
      }, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )


    it('should fail for correct move, gameID and numeric nickname', () =>
      logic.makeAGameMove(123, {from: "e2", to: "e4", promotion: "q"}, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail for correct nickname, gameID and malformed move', () =>
      logic.makeAGameMove(nickname, {x: "e2", to: "e4", promotion: "q"}, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`move is of wrong format`))
    )

    it('should fail for correct nickname, gameID and empty move', () =>
      logic.makeAGameMove(nickname, {}, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`move is of wrong format`))
    )

    it('should fail for correct nickname, gameID and undefined move', () =>
      logic.makeAGameMove(nickname, undefined, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`move is of wrong format`))
    )

    it('should fail for correct nickname, gameID and numeric move', () =>
      logic.makeAGameMove(nickname, 112, gameInProgress.id, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`move is of wrong format`))
    )

    afterEach(()=>  fetchMock.restore()
   )
  }) // end make a game move


  describe('request new game', () => {

    const email1 = "hoppy" + Math.random() + "@somewhere.com"
    const email2 = "hoppy" + Math.random() + "@somewhere.com"
    nicknameA = uuidv1()
    nicknameB = uuidv1()

    beforeEach(async () => {
      await User.create({email: email1, password, nickname: nicknameA})
      await User.create({email: email2, password, nickname: nicknameB})
      token = await logic.authenticate(nicknameA, password)
      token2 = await logic.authenticate(nicknameB, password)
    })

    it('should succeed with correct requester and destination', () =>
      logic.requestGame(nicknameA, nicknameB, token)
        .then(res => {
          expect(res).to.deep.equal({message: 'game requested'})
          return Game.findOne({initiator: nicknameA, acceptor: nicknameB})
        })
        .then(game => {
          expect(game).not.to.be.undefined
          expect(game.initiator).to.equal(nicknameA)
          expect(game.acceptor).to.equal(nicknameB)
          expect(game.state).to.equal('invited')
          return Game.find({initiator: nicknameA, acceptor: nicknameB})
        })
        .then(games => expect(games.length).to.equal(1))
    )



    it('should fail for wrong token', () =>
      logic.requestGame(nicknameA, nicknameB, token2)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for bad token', () =>
      logic.requestGame(nicknameA, nicknameB, "1234")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`jwt malformed`))
    )

    it('should fail for empty token', () =>
      logic.requestGame(nicknameA, nicknameB, "")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for undefined token', () =>
      logic.requestGame(nicknameA, nicknameB, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for numeric token', () =>
      logic.requestGame(nicknameA, nicknameB, 1234)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail when game already exists between players ', () =>
      Promise.resolve()
        .then(_ => {
          engine = new Chess()
          uuid = uuidv1()
          engines.set(uuid, engine)
          pgn = engine.pgn()
          return Game.create({
            initiator: nicknameA,
            acceptor: nicknameB,
            engineID: uuid,
            pgn,
            winner: "",
            state: "invited",
            toPlay: nicknameA,
            inCheck: false,
            inDraw: false,
            inStalemate: false,
            inCheckmate: false,
            inThreefoldRepetition: false,
            insufficientMaterial: false,
            hasAcknowledgedGameOver: [],
          })
        })
        .then(_ => logic.requestGame(nicknameA, nicknameB, token))
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`game between ${nicknameA} and ${nicknameB} already exists`))
    )

    it('should fail when destination user does not exist', () =>
      logic.requestGame(nicknameA, "sorry charlie", token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`user with sorry charlie nickname does not exist`))
    )

    it('should fail when requesting user does not exist', () =>
      logic.requestGame('tricky rabbit', nicknameB, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail when requesting user nickname missing', () =>
      logic.requestGame('', nicknameB, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail when requesting user nickname undefined', () =>
      logic.requestGame(undefined, nicknameB, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )
    it('should fail when requesting user nickname numeric', () =>
      logic.requestGame(123, nicknameB, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    )

    it('should fail when destination user nickname missing', () =>
      logic.requestGame(nicknameA, '', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid opponent`))
    )

    it('should fail when destination user nickname undefined', () =>
      logic.requestGame(nicknameA, undefined, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid opponent`))
    )
    it('should fail when destination user nickname numeric', () =>
      logic.requestGame(nicknameA, 123, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid opponent`))
    )

  }) // end request new game

  describe('respond to game request', () => {


    const email1 = "hoppy" + Math.random() + "@somewhere.com"
    const email2 = "hoppy" + Math.random() + "@somewhere.com"
    let nicknameA
    let nicknameB
    let game
    let uuid
    let engine
    let pgn
    let badID

    beforeEach(async () => {

      nicknameA = uuidv1()
      nicknameB = uuidv1()
      engine = new Chess()
      uuid = uuidv1()
      engines.set(uuid, engine)
      pgn = engine.pgn()
      badID = new ObjectId().toString()

      await User.create({email: email1, password, nickname: nicknameA})
      await User.create({email: email2, password, nickname: nicknameB})
      token = await logic.authenticate(nicknameB, password)
      token2 = await logic.authenticate(nicknameA, password)

      game = await Game.create({
        initiator: nicknameA,
        acceptor: nicknameB,
        engineID: uuid,
        pgn,
        winner: "",
        state: "invited",
        toPlay: nicknameA,
        inCheck: false,
        inDraw: false,
        inStalemate: false,
        inCheckmate: false,
        inThreefoldRepetition: false,
        insufficientMaterial: false,
        hasAcknowledgedGameOver: [],
      })
    })


    it('should to succeed with correct usernames, gameID and affirmative answer', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, true, token)
        .then(({message}) => {
          expect(message).to.equal("game request response sent")
        return  Game.findOne({_id:ObjectId(game.id)})
        })
        .then(game => expect(game.state).to.equal('playing'))
    )



    it('should succeed with correct usernames, gameID and negative answer', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, false, token)
        .then(({message}) => {
          expect(message).to.equal("game request response sent")
          return  Game.findOne({_id:ObjectId(game.id)})
        })
        .then(game => expect(game.state).to.equal('terminated'))
    )





    it('should fail for wrong token', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, true, token2)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for bad token', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, true, "something")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`jwt malformed`))
    )

    it('should fail for empty token', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, true, "")
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for undefined token', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, true, undefined)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )

    it('should fail for numeric token', () =>
      logic.respondToGameRequest(nicknameB, nicknameA, game.id, true, 123)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    )



    it('should fail with string answer', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, badID, 'true', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`answer is not type boolean`))
    })

    it('should fail with missing answer', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, badID, '', token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`answer is not type boolean`))
    })

    it('should fail with undefined answer', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, badID, undefined, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`answer is not type boolean`))
    })

    it('should  fail with numeric answer', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, badID, 123, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`answer is not type boolean`))
    })


    it('should  fail with wrong game id', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, badID, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`game with id ${badID} does not exist`))
    })

    it('should  fail with missing game id', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, '', true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    })

    it('should  fail with undefined game id', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, undefined, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    })

    it('should  fail with numeric game id', () => {
      logic.respondToGameRequest(nicknameB, nicknameA, 123, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid gameID`))
    })

    it('should fail with wrong confirmer', () => {
      logic.respondToGameRequest("smithy", nicknameA, game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    })

    it('should fail with missing confirmer', () => {
      logic.respondToGameRequest('', nicknameA, game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    })

    it('should  fail with undefined confirmer', () => {
      logic.respondToGameRequest(undefined, nicknameA, game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    })

    it('should  fail with numeric confirmer', () => {
      logic.respondToGameRequest(123, nicknameA, game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid nickname`))
    })

    it('should  to fail with wrong destination', () => {
      logic.respondToGameRequest(nicknameA, "will robinson", game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid token`))
    })

    it('should  fail with missing destination', () => {
      logic.respondToGameRequest(nicknameA, "", game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid destination`))
    })

    it('should  fail with undefined destination', () => {
      logic.respondToGameRequest(nicknameA, undefined, game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid destination`))
    })

    it('should fail with undefined destination', () => {
      logic.respondToGameRequest(nicknameA, 123, game.id, true, token)
        .catch(err => err)
        .then(({message}) => expect(message).to.equal(`invalid destination`))
    })



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