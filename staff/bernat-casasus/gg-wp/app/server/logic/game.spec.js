require('dotenv').config()

const { logic } = require('./game')
const { expect } = require('chai')
const mongoose = require('mongoose')

const { env: { MONGO_URL } } = process
describe('logic', () => {
    let _connection

    const validSummonerName = 'imk'
    const validSummonerId = '20917980'
    const validUnrankedId = '49290874'
    const validLeagueId = 'fbfb11b0-0755-11e8-825d-c81f66dd0e0d'
    const validAccountId = '24267437'
    const validNumericAccountId = 24267437
    const validGameId = '3583760609'
    const newSummonerName = 'Alexelsilva'

    const unrankedSummonerName = 'Javier1177'
    const unexistentUsername = 'gesztter'
    const unexistentSummonerId = '200000000'
    const invalidGameId = '444444444'
    const invalidLeagueId = 'fbeb11b0-0755-11e8-825d-c81a66dd9e0d'
    const invalidLSummonerId = '123asd'
    const invalidAccountId = '4444'

    const whiteSpace = ' '
    const slash = '/'
    const invalidCharacter = '#'
    const numericType = 123

    before(() =>
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            .then(conn => _connection = conn)
    )

    after(() =>
        _connection.disconnect()
    )

    true && describe('call Api methods', () => {

        !true && describe('search by Username', () => {

            true && it('should retrive the data on valid username', () =>
                logic.searchByUsername(validSummonerName)
                    .then(res => expect(res.name).to.equal(validSummonerName))
            )

            true && it('shoud fail on unexistent username', () =>
                logic.searchByUsername(unexistentUsername)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal(`Data not found`)
                    })

            )

            true && it('shoud fail on sending a white space as username', () =>
                logic.searchByUsername(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal(`Internal server error`)
                    })

            )

            true && it('shoud fail on sending a slash /  as summonerId', () =>
                logic.searchByUsername(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Forbidden')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerId', () =>
                logic.searchByUsername(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Unauthorized')
                    })
            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.searchByUsername(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal(undefined)
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.searchByUsername(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal(undefined)
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.searchByUsername(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal(undefined)
                    })
            )

        })

        !true && describe('search by summonerId', () => {

            true && it('should retrive the data on valid summoner id', () =>
                logic.searchBySummonerId(validSummonerId)
                    .then(res => expect(res.id.toString()).to.equal(validSummonerId))
            )

            true && it('shoud fail on unexistent summoner id', () =>
                logic.searchBySummonerId(unexistentSummonerId)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal(`Data not found`)
                    })

            )

            true && it('shoud fail on sending a white space as summoner id', () =>
                logic.searchBySummonerId(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Bad request - Path parameter \'summonerId\' must be numeric')
                    })

            )

            true && it('shoud fail on sending a slash /  as summonerId', () =>
                logic.searchBySummonerId(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Forbidden')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerId', () =>
                logic.searchBySummonerId(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Unauthorized')
                    })
            )

        })

        !true && describe('retrive ranked queues by summoner id', () => {

            true && it('should retrive data (if exists) on valid id', () =>
                logic.getRankedQueuesBySummonerId(validSummonerId)
                    .then(res => expect(res.length).to.have.length)
            )

            true && it('should fail if ranked data does not exist', () =>
                logic.getRankedQueuesBySummonerId(validUnrankedId)
                    .then(res => {
                        expect(res).to.exist
                        expect(res.queueError).to.equal('The summoner does not belong to any League yet!')
                    })
            )

            true && it('should fail on invalid summonerId', () =>
                logic.getRankedQueuesBySummonerId(invalidLSummonerId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Invalid id')
                    })
            )

            true && it('should fail on invalid id type', () =>
                logic.getRankedQueuesBySummonerId(numericType)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Invalid id')
                    })

            )

            true && it('shoud fail on sending an empty string as username', () =>
                logic.getRankedQueuesBySummonerId(whiteSpace)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Invalid id')
                    })

            )

            true && it('shoud fail on sending a slash /  as summonerId', () =>
                logic.getRankedQueuesBySummonerId(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerId', () =>
                logic.getRankedQueuesBySummonerId(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.getRankedQueuesBySummonerId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.getRankedQueuesBySummonerId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.getRankedQueuesBySummonerId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

        })

        !true && describe('retrive matches by account id', () => {

            true && it('should retrive matches on corretc account id', () =>
                logic.getMatchesByAccountId(validAccountId)
                    .then(res => expect(res.matches.length).to.have.length)

            )

            true && it('should not retrive on non numeric account id', () =>
                logic.getMatchesByAccountId(validNumericAccountId)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })

            )

            true && it('should fail on invalid account id', () =>
                logic.getMatchesByAccountId(invalidAccountId)
                    .then(res => {
                        expect(res).to.exist
                        expect(res.matchesError).to.equal('The summoner does not have any ranked on solo queue mode yet!')
                    })

            )
            true && it('shoud fail on sending a white space as summonerId', () =>
                logic.getMatchesByAccountId(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a slash /  as summonerId', () =>
                logic.getMatchesByAccountId(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerId', () =>
                logic.getMatchesByAccountId(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.getMatchesByAccountId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.getMatchesByAccountId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.getMatchesByAccountId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )


        })

        !true && describe('retrive match by game id', () => {

            true && it('should retrive matches on corretc game id', () =>
                logic._getMatchByGameId(validGameId)
                    .then(res => expect(res.gameId.toString()).to.equal(validGameId))

            )

            true && it('should fail on invalid game id', () =>
                logic._getMatchByGameId(invalidGameId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Data not found')
                    })

            )

            true && it('should fail on non numeric game id', () =>
                logic._getMatchByGameId(numericType)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Invalid id')
                    })

            )

            true && it('shoud fail on sending a white space as game id', () =>
                logic._getMatchByGameId(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a slash /  as game id', () =>
                logic._getMatchByGameId(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a invalid character as game id', () =>
                logic._getMatchByGameId(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending undefined as game id', () =>
                logic._getMatchByGameId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as game id', () =>
                logic._getMatchByGameId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && ('shoud fail on sending NaN as game id', () =>
                logic._getMatchByGameId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )
        })

        !true && describe('retrive league by league id', () => {
            true && it('should retrive league on correct league id', () =>
                logic.getLeagueByLeagueId(validLeagueId)
                    .then(res => expect(res.leagueId).to.equal(validLeagueId))

            )

            //WARN! do not execute this (it) test too much or will result in a LolAPI blackList
            !true && it('should fail on unexistent league', () =>
                logic.getLeagueByLeagueId(invalidLeagueId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Not found')
                    })
            )

            true && it('shoud fail on sending a white space as leagueId', () =>
                logic.getLeagueByLeagueId(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )

            true && it('shoud fail on sending a slash /  as leagueId', () =>
                logic.getLeagueByLeagueId(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Forbidden')
                    })
            )

            true && it('shoud fail on sending a invalid character as leagueId', () =>
                logic.getLeagueByLeagueId(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Unauthorized')
                    })
            )

            true && it('shoud fail on sending undefined as leagueId', () =>
                logic.getLeagueByLeagueId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )

            true && it('shoud fail on sending null as leagueId', () =>
                logic.getLeagueByLeagueId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )

            true && ('shoud fail on sending NaN as leagueId', () =>
                logic.getLeagueByLeagueId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )
        })

        !true && describe('retrive live game by summoner id', () => {

            //WARN! the id provided should be a real id and the player should be playing to watch succesful results!
            !true && it('should retrive game on correct summoner id and live game', () =>
                logic.getLiveGameBySummonerId('23555259')
                    .then(res => {
                        expect(res.gameId).to.exist

                    })

            )

            true && it('should fail on unexistent summonerId', () =>
                logic.getLiveGameBySummonerId(unexistentSummonerId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('The summoner is not in an active game.')
                    })
            )

            true && it('shoud fail on sending a white space as summonerId', () =>
                logic.getLiveGameBySummonerId(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a slash /  as summonerId', () =>
                logic.getLiveGameBySummonerId(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerId', () =>
                logic.getLiveGameBySummonerId(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.getLiveGameBySummonerId(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.getLiveGameBySummonerId(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.getLiveGameBySummonerId(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )
        })

    })

    true && describe('general functions', () => {

        !true && describe('retrive summoner summary info', () => {

            true && it('should retrive summary on correct summonerName', () =>
                logic.getSummonerSumary(validSummonerName)
                    .then(res => expect(res.name).to.equal(validSummonerName))

            )

            true && it('should not retrive league and matches on a player that does not have any', () =>
                logic.getSummonerSumary(newSummonerName)
                    .then(res => {
                        expect(res.name).to.equal(newSummonerName)
                        expect(res.queueError).to.equal('The summoner does not belong to any League yet!')
                        expect(res.matchesError).to.equal('The summoner does not have any ranked on solo queue mode yet!')

                    })
            )

            true && it('should not retrive league on a player that does not have any', () =>
                logic.getSummonerSumary(unrankedSummonerName)
                    .then(res => {
                        expect(res.name).to.equal(unrankedSummonerName)
                        expect(res.queueError).to.equal('The summoner does not belong to any League yet!')
                        expect(res.championsStats).to.exist

                    })
            )

            true && it('shoud succes on sending a number as summonerName', () =>
                logic.getSummonerSumary(numericType)
                    .then(res => expect(res.name).to.equal(numericType.toString()))
            )

            true && it('should fail on unexistent summonerName', () =>
                logic.getSummonerSumary(unexistentUsername)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Data not found')
                    })
            )

            true && it('shoud fail on sending a white space as summonerName', () =>
                logic.getSummonerSumary(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid summoner name')
                    })
            )

            true && it('shoud fail on sending a slash /  as summonerName', () =>
                logic.getSummonerSumary(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Forbidden')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerName', () =>
                logic.getSummonerSumary(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Unauthorized')
                    })
            )

            true && it('shoud fail on sending undefined as summonerName', () =>
                logic.getSummonerSumary(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid summoner name')
                    })
            )

            true && it('shoud fail on sending null as summonerName', () =>
                logic.getSummonerSumary(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid summoner name')
                    })
            )

            true && it('shoud fail on sending NaN as summonerName', () =>
                logic.getSummonerSumary(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid summoner name')
                    })
            )
        })

        !true && describe('retrive league', () => {

            true && it('should retrive league on correct league id', () =>
                logic.getLeague(validLeagueId)
                    .then(res => expect(res.ranki).to.exist)

            )

            //WARN! do not execute this (it) test too much or will result in a LolAPI blackList
            !true && it('should fail on unexistent league', () =>
                logic.getLeague(invalidLeagueId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Not found')
                    })
            )

            true && it('shoud fail on sending a white space as leagueId', () =>
                logic.getLeague(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )

            true && it('shoud fail on sending a slash /  as leagueId', () =>
                logic.getLeague(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Forbidden')
                    })
            )

            true && it('shoud fail on sending a invalid character as leagueId', () =>
                logic.getLeague(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Unauthorized')
                    })
            )

            true && it('shoud fail on sending undefined as leagueId', () =>
                logic.getLeague(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )

            true && it('shoud fail on sending null as leagueId', () =>
                logic.getLeague(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )

            true && ('shoud fail on sending NaN as leagueId', () =>
                logic.getLeague(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid leagueId')
                    })
            )
        })

        !true && describe('retrive live game', () => {

            //WARN! the id provided should be a real id and the player should be playing to watch succesful results!
            !true && it('should retrive game on correct summoner id and live game', () =>
                logic.getLiveGame('34148603')
                    .then(res => {
                        expect(res).to.have.length(10)
                        expect(res[0].summonerName).to.exist
                        expect(res[0].profileIcon).to.exist
                        expect(res[0].championName).to.exist
                        expect(res[0].championIcon).to.exist
                        expect(res[0].teamId).to.equal(100)
                        expect(res[0].spell1).to.exist
                        expect(res[0].spell2).to.exist
                    })

            )

            true && it('should fail on unexistent summonerId', () =>
                logic.getLiveGame(unexistentSummonerId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('The summoner is not in an active game.')
                    })
            )

            true && it('shoud fail on sending a white space as summonerId', () =>
                logic.getLiveGame(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a slash /  as summonerId', () =>
                logic.getLiveGame(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerId', () =>
                logic.getLiveGame(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending undefined as summonerId', () =>
                logic.getLiveGame(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerId', () =>
                logic.getLiveGame(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && ('shoud fail on sending NaN as summonerId', () =>
                logic.getLiveGame(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )
        })

        !true && describe('retrive summary preview', () => {

            true && it('should retrive summary on correct summonerName', () =>
                logic.getSummaryPreview(validSummonerId)
                    .then(res => expect(res.id.toString()).to.equal(validSummonerId))

            )

            true && it('should not retrive league on a player that does not have any', () =>
                logic.getSummaryPreview(validUnrankedId)
                    .then(res => {
                        expect(res.id.toString()).to.equal(validUnrankedId)
                        expect(res.queueError).to.equal('The summoner does not belong to any League yet!')

                    })
            )

            true && it('should fail on unexistent summonerName', () =>
                logic.getSummaryPreview(unexistentSummonerId)
                    .catch(err => err)
                    .then(err => {
                        expect(err).to.exist
                        expect(err.message).to.equal('Data not found')
                    })
            )

            true && it('shoud fail on sending a white space as summonerName', () =>
                logic.getSummaryPreview(whiteSpace)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a slash /  as summonerName', () =>
                logic.getSummaryPreview(slash)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending a invalid character as summonerName', () =>
                logic.getSummaryPreview(invalidCharacter)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending undefined as summonerName', () =>
                logic.getSummaryPreview(undefined)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending null as summonerName', () =>
                logic.getSummaryPreview(null)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )

            true && it('shoud fail on sending NaN as summonerName', () =>
                logic.getSummaryPreview(NaN)
                    .catch(err => err)
                    .then(({ message }) => {
                        expect(message).to.equal('Invalid id')
                    })
            )
        })

    })

})