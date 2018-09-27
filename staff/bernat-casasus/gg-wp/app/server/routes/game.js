require('dotenv').config()

const express = require('express')
const { logic, LogicError } = require('../logic/game')


const game = express.Router()


//Get Summoner Summary
game.get('/game/summary/:username', (req, res) => {
 
    const { params: { username } } = req

    logic.getSummonerSumary(username)
        .then(summary => res.json(summary))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Get League
game.get('/game/league/:leagueid', (req, res) => {
    const { params: { leagueid } } = req

    logic.getLeague(leagueid)
        .then(league => res.json(league))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//GET Live Game
game.get('/game/live/:summonerid', (req, res) => {
    const { params: { summonerid } } = req

    logic.getLiveGame(summonerid)
        .then(game => res.json(game))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//GET Live Game Id
game.get('/game/spectate/:summonerid', (req, res) => {
    const { params: { summonerid } } = req
    logic.getLiveGameBySummonerId(summonerid)
        .then(game => res.json(game))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})

//Get Summary Preview
game.get('/game/summary/preview/:summonerid', (req, res) => {
    const { params: { summonerid } } = req

    logic.getSummaryPreview(summonerid)
        .then(summary => res.json(summary))
        .catch(err => {
            const { message } = err
            let code
            if (err instanceof LogicError) code = 401
            if (!(err instanceof LogicError)) code = 500
            res.status(err instanceof LogicError ? 401 : 500).json({ code, message })
        })
})
module.exports = function () {

    return game
}