require('dotenv').config()
const fetch = require('node-fetch');
const Champion = require('../data/models/champion')
const Spell = require('../data/models/spell')
const calculateAverage = require('../utils/calculate-average')
const validateId = require('../helpers/validate-id')

const { env: { API_KEY } } = process

const logic = {
    /**
     *Call LOL Api
     *
     * Calls the oficial League of Legends Api
     * 
     * @param {string} path
     * @returns {Promise<Object>}
     */
    _callLolApi(path) {
        return fetch(`https://euw1.api.riotgames.com/lol/${path}api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => res)
    },

    /**
     *Search By Username
     *
     * Retrives the summoner data by summoner name
     * 
     * @param {string} summoner summoner name
     * @returns {Promise<Object>}
     */
    searchByUsername(summoner) {
        return this._callLolApi(`summoner/v3/summoners/by-name/${summoner}?`)
            .then(res => {
                if (res.status && res.status.message === 'Data not found') throw new LogicError('The summoner name does not exist.')
                if (res.status) throw new Error(res.status.message)

                return res
            })
    },
    /**
     *Search By Summoner Id
     *
     * Retrives the summoner data by summoner id
     * 
     * @param {string} summonerId
     * @returns {Promise<Object>}
     */
    searchBySummonerId(summonerId) {
        return this._callLolApi(`summoner/v3/summoners/${summonerId}?`)
            .then(res => {
                if (res.status) throw new Error(res.status.message)

                return res
            })
    },
    /**
     *Ranked Queues By Summoner Id
     *
     * Retrives summoner queues information by summoner id
     * 
     * @param {strin} summonerId summoner id
     * @returns {Promise<Object>}
     */
    getRankedQueuesBySummonerId(summonerId) {
        return Promise.resolve()
            .then(() => {
                this._validateId(summonerId)

                return this._callLolApi(`league/v3/positions/by-summoner/${summonerId}?`)
                    .then(res => {
                        if (res.status) throw new Error(res.status.message)
                        if (res.length === 0) return { queueError: 'The summoner does not belong to any League yet!' }

                        return res
                    })
            })
    },
    /**
     *Matches By Account Id
     *
     * Retrive summoner matches with their account id
     * 
     * @param {string} accountId summoner account id
     * @returns {Promise<Object>}
     */
    getMatchesByAccountId(accountId) {
        return Promise.resolve()
            .then(() => {
                this._validateId(accountId)

                return this._callLolApi(`match/v3/matchlists/by-account/${accountId}?queue=420&`)
                    .then(res => {
                        if (res.status && res.status.message === 'Data not found') return { matchesError: 'The summoner does not have any ranked on solo queue mode yet!' }
                        if (res.status) throw new Error(res.status.message)

                        return res
                    })
            })
    },
    /**
     *Matche By Game Id
     *
     * Retrive summoner match with the match id
     * 
     * @param {*string} gameId match id
     * @returns {Promise<Object>}
     */
    _getMatchByGameId(gameId) {
        return Promise.resolve()
            .then(() => {
                this._validateId(gameId)

                return this._callLolApi(`match/v3/matches/${gameId}?`)
                    .then(res => {
                        if (res.status) throw new Error(res.status.message)

                        return res
                    })
            })
    },
    /**
     *League By League Id
     *
     * Retrives summoner league with the league id.
     * 
     * @param {string} leagueId summoner league id
     * @returns {Promise<Object>}
     */
    getLeagueByLeagueId(leagueId) {
        return Promise.resolve()
            .then(() => {
                this._validateLeagueId(leagueId)

                return this._callLolApi(`league/v3/leagues/${leagueId}?`)
                    .then(res => {
                        if (res.status) throw new Error(res.status.message)

                        return res
                    })
            })
    },
    /**
     *Live Games By Summoner Id
     *
     * Retrive game info if the summoner is currently in game.
     * 
     * @param {summoner} summonerId summoner id
     * @returns {Promise<Object>}
     */
    getLiveGameBySummonerId(summonerId) {
        return Promise.resolve()
            .then(() => {

                this._validateId(summonerId)

                return this._callLolApi(`spectator/v3/active-games/by-summoner/${summonerId}?`)
                    .then(res => {
                        if (res.status && res.status.message === 'Data not found') throw new LogicError('The summoner is not in an active game.')
                        if (res.status) throw new Error(res.status.message)
                        return res
                    })
            })
    },


    /**
     *Filter Queues By Queue Name
     *
     * Filters the summoner queues by their queue name.
     * 
     * @param {string} queueName name of the you want to use as filter
     * @param {Array} queuesList queues list
     * @returns {Object}
     */
    _filterQueuesByQueueName(queueName, queuesList) {
        let filteredQueue
        let existsQueue = false
        queuesList.forEach(({ queueType, leagueId, leagueName, tier, rank, leaguePoints, wins, losses }) => {
            if (queueType === queueName) {
                existsQueue = true
                return filteredQueue = { leagueId, leagueName, tier, rank, leaguePoints, wins, losses }
            }
        })
        if (existsQueue) return filteredQueue

        return { queueError: 'The summoner does not have any ranked on solo queue mode yet!' }
    },
    /**
     *Count Lanes And Champions
     *
     * Count all the lanes the summoner has played and all the champions.
     * 
     * @param {Object} matches properti of the object recived
     * @returns {Object}
     */
    _countLanesAndChampions({ matches }) {
        const laneStats = {}
        const countChampions = {
            mostFrequent: function () {
                let mostPlayed = 0
                for (var champ in this) {
                    let champCode = parseInt(champ, 10)
                    if (champCode > mostPlayed) mostPlayed = champCode
                }
                delete this[mostPlayed.toString()]
                return mostPlayed
            }
        }

        matches.forEach(match => {
            if (match.lane === 'MID' || match.lane === 'BOTTOM' || match.lane === 'TOP' || match.lane === 'JUNGLE') {
                if (!laneStats.hasOwnProperty(match.lane)) laneStats[match.lane] = 0
                laneStats[match.lane]++
            }

            if (!countChampions.hasOwnProperty(match.champion)) countChampions[match.champion] = 0
            countChampions[match.champion]++
        })

        return [laneStats, countChampions]
    },
    /**
     *Calculate Champions States
     *
     * Culculate:
     * - The top 5 champions played
     * - For each champion:
     *      - championLosses 
     *      - championsWins
     *      - totalGold
     *      - fistBlood
     *      - minionsKilled
     *      - kills
     *      - assists
     *      - deaths
     *      - kda
     * @param {Object} countChampionsAndLanes times the summoner has played a champions and lane
     * @param {Objct} matches last 100 matches the summoner has played
     * @param {string} summonerId summoner id
     * @returns {Object}
     */
    async _calculateChampionsStats(countChampionsAndLanes, matches, summonerId) {
        const mostPlayedChampionsStats = {}
        mostPlayedChampionsStats["championsStats"] = []
        const size = Object.keys(countChampionsAndLanes[1]).length
        let countChampionStats = 0

        if (size === 1) return { championsStatsError: 'The summoner does not have any champion played on ranked on solo queue mode yet!' }
        if (size === 2) countChampionStats = 1
        if (size === 3) countChampionStats = 2
        if (size === 4) countChampionStats = 3
        if (size === 5) countChampionStats = 4
        if (size > 6) countChampionStats = 5

        for (let i = 0; i < countChampionStats; i++) {
            let championId = countChampionsAndLanes[1].mostFrequent()
            let championLosses = 0
            let championWins = 0
            const totalGold = []
            let fistBlood = 0
            const minionsKilled = []
            let kills = 0
            let assists = 0
            let deaths = 0
            let kda
            let RATE_LIMIT_CONTROL = 20
            let RATE_LIMIT_COUNT = 0

            for (const match of matches.matches) {
                if (match.champion === championId && RATE_LIMIT_COUNT < RATE_LIMIT_CONTROL) {
                    const game = await this._getMatchByGameId(match.gameId.toString())
                    let playerId
                    let teamId

                    game.participantIdentities.forEach(participant => {
                        if (participant.player.summonerId === summonerId) {
                            playerId = participant.participantId
                        }
                    })

                    game.participants.forEach(participant => {
                        if (participant.participantId === playerId) {
                            teamId = participant.teamId
                            totalGold.push(participant.stats.goldEarned)
                            minionsKilled.push(participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilledTeamJungle + participant.stats.neutralMinionsKilledEnemyJungle)
                            kills += parseInt(participant.stats.kills, 10)
                            assists += parseInt(participant.stats.assists, 10)
                            deaths += parseInt(participant.stats.deaths, 10)
                            if (participant.stats.fistBloodKill == true) fistBlood++
                        }
                    })

                    game.teams.forEach(team => {
                        if (team.teamId === teamId) {
                            if (team.win === 'Fail') championLosses++
                            if (team.win === 'Win') championWins++

                        }
                    })

                    RATE_LIMIT_COUNT++
                }

            }
            const champion = await Champion.findOne({ key: championId.toString() })
            const championIcon = `https://ddragon.leagueoflegends.com/cdn/8.17.1/img/champion/${champion.name}.png`

            kda = `${((kills + assists) / deaths).toFixed(2)}:1`
            if (kills === 0, assists === 0, deaths === 0) kda = `${(0).toFixed(2)}:1`



            mostPlayedChampionsStats["championsStats"].push({ "name": champion.name, "championIcon": championIcon, "timesPlayed": totalGold.length, "wins": championWins, "losses": championLosses, "kda": kda, "goldAvg": this._calculateGoldAverage(totalGold), "totalGold": totalGold, "totalFirstBloods": fistBlood, "minionsKilledAvg": calculateAverage(minionsKilled), "totalMinionsKilled": minionsKilled })
            // console.log({ "name": champion.name, "championIcon": championIcon, "timesPlayed": totalGold.length, "wins": championWins, "losses": championLosses, "kda": kda, "goldAvg": this._calculateGoldAverage(totalGold),"totalGold": totalGold, "totalFirstBloods": fistBlood, "minionsKilledAvg": calculateAverage(minionsKilled), "totalMinionsKilled": minionsKilled })

        }

        mostPlayedChampionsStats["lanesStats"] = countChampionsAndLanes[0]
        return mostPlayedChampionsStats

    },
    /**
     *Calculate Gold Average
     *
     * Calculates the average gold from an array
     * 
     * @param {Array} goldList
     * @returns {String}
     */
    _calculateGoldAverage(goldList) {
        const result = calculateAverage(goldList).toString()

        if (result.length === 5) return result.slice(0, 2) + "k"
        if (result.length === 4) return result.slice(0, 1) + "k"

        return result
    },

    /**
     *Validate Summoner Name
     *
     * Validates if the summoner name is valid
     * 
     * @param {any} username value that will be checked
     * @returns {String}
     */
    _validateSummonerName(username) {
        if (username == null || username !== username || username == false) throw new LogicError('Invalid summoner name')
        if (typeof username === "number") username = username.toString()
        if (typeof username !== "string") throw new LogicError('Invalid summoner name')

        return username
    },
    /**
     *Validate League Id
     *
     * Validates if it is a valid league id
     * 
     * @param {String} leagueId summoner league id
     */
    _validateLeagueId(leagueId) {
        if (leagueId == null || leagueId !== leagueId || leagueId == false || typeof leagueId !== "string") throw new LogicError('Invalid leagueId')
    },
    /**
     *Validate Id
     *
     * Validates if it is a valid id
     * 
     * @param {any} id value that will be checked
     */
    _validateId(id) {
        if (!validateId(id)) throw new LogicError('Invalid id')
    },

    /**
     *Summoner Summary
     *
     * Retrives all the summoner summary, collects the result of the other function calls (if any) and generates a new unique object with all the results.
     * 
     * @param {string} username summoner name
     * @returns {Object}
     */
    async getSummonerSumary(username) {
        username = this._validateSummonerName(username)

        const summonerData = []

        const profile = await this.searchByUsername(username)

        profile.profileIcon = `http://ddragon.leagueoflegends.com/cdn/8.17.1/img/profileicon/${profile.profileIconId}.png`
        delete profile.profileIconId
        delete profile.revisionDate

        const queue = this.getRankedQueuesBySummonerId(profile.id.toString())
            .then(queues => {
                if (queues.queueError) return queues
                return this._filterQueuesByQueueName('RANKED_SOLO_5x5', queues)
            })

        const matchesStats = this.getMatchesByAccountId(profile.accountId.toString())
            .then(async matches => {

                if (matches.matchesError) return matches
                const countChampionsAndLanes = this._countLanesAndChampions(matches)
                const championStatsPerGame = await this._calculateChampionsStats(countChampionsAndLanes, matches, profile.id)

                return championStatsPerGame

            })

        summonerData.push(profile)
        summonerData.push(queue)
        summonerData.push(matchesStats)

        return Promise.all(summonerData)
            .then((summonerData) => {
                const result = {}
                summonerData.forEach(obj => {
                    for (var key in obj) {
                        result[key] = obj[key]
                    }
                })
                return result
            })
    },

    /**
     *Retrive League Id
     *
     * Retrive all the league information by league id
     * 
     * @param {String} leagueId summoner league id
     * @returns {Object}
     */
    async getLeague(leagueId) {

        const leagueData = await this.getLeagueByLeagueId(leagueId)

        const { name, tier } = leagueData

        const ranki = []
        const rankii = []
        const rankiii = []
        const rankiv = []
        const rankv = []

        leagueData.entries.forEach(player => {
            const { rank } = player
            if (rank === "I") ranki.push(player)
            if (rank === "II") rankii.push(player)
            if (rank === "III") rankiii.push(player)
            if (rank === "IV") rankiv.push(player)
            if (rank === "V") rankv.push(player)
        })

        function compare(a, b) {
            if (a.leaguePoints < b.leaguePoints)
                return 1;
            if (a.leaguePoints > b.leaguePoints)
                return -1;
            return 0;
        }

        ranki.sort(compare);
        rankii.sort(compare);
        rankiii.sort(compare);
        rankiv.sort(compare);
        rankv.sort(compare);

        return { name, tier, ranki, rankii, rankiii, rankiv, rankv }
    },

    /**
     *Live Game
     *
     *Retrive live game infromation if the summoner is currently in game.
     * 
     * @param {String} summonerId summoner id
     * @returns{Promise<Object>}
     */
    async getLiveGame(summonerId) {

        const gameData = await this.getLiveGameBySummonerId(summonerId)

        const result = gameData.participants.map(async player => {
            const { teamId, spell1Id, spell2Id, championId, profileIconId, summonerName, summonerId } = player

            const profileIcon = `http://ddragon.leagueoflegends.com/cdn/8.17.1/img/profileicon/${profileIconId}.png`

            const champion = await Champion.findOne({ key: championId.toString() })
            const championIcon = `https://ddragon.leagueoflegends.com/cdn/8.17.1/img/champion/${champion.name}.png`

            const spell1 = await Spell.findOne({ key: spell1Id.toString() })
            const spell2 = await Spell.findOne({ key: spell2Id.toString() })

            const rankedQueue = await this.getRankedQueuesBySummonerId(summonerId.toString())
            const rankedInfo = this._filterQueuesByQueueName('RANKED_SOLO_5x5', rankedQueue)
            const { tier, wins, losses } = rankedInfo

            return {
                summonerName, profileIcon, championName: champion.name
                , championIcon, teamId, spell1: { name: spell1.name, icon: spell1.icon }, spell2: { name: spell2.name, icon: spell2.icon }, rankedStats: { tier, wins, losses }
            }
        })

        return Promise.all(result)

    },
 
    /**
     *Summary Preview
     *
     * Retrives a summoner basic information such as:
     * - Summoner Name
     * - Summoner Account id
     * - Summoner id
     * - Summoner prifile icon id
     * - Summoner League
     * 
     * @param {string} summonerId summoner id
     * @returns {Object}
     */
    async getSummaryPreview(summonerId) {
        this._validateId(summonerId)

        const summonerData = []

        const profile = await this.searchBySummonerId(summonerId)

        profile.profileIcon = `http://ddragon.leagueoflegends.com/cdn/8.17.1/img/profileicon/${profile.profileIconId}.png`
        delete profile.profileIconId
        delete profile.revisionDate

        const queue = this.getRankedQueuesBySummonerId(profile.id.toString())
            .then(queues => {
                if (queues.queueError) return queues
                return this._filterQueuesByQueueName('RANKED_SOLO_5x5', queues)
            })

        summonerData.push(profile)
        summonerData.push(queue)

        return Promise.all(summonerData)
            .then((summonerData) => {
                const result = {}
                summonerData.forEach(obj => {
                    for (var key in obj) {
                        result[key] = obj[key]
                    }
                })
                return result
            })
    },

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }