const mongoose = require('mongoose')
const Spell = require('../models/spell')
const fs = require('fs')

const file = JSON.parse(fs.readFileSync('./spells-data.json','utf-8'))

mongoose.connect('mongodb://localhost/gg-wp', { useNewUrlParser: true })
    .then(() => {
        console.log('connected')
    })
    .then( () => Promise.all(file.map(elem => Spell.create(elem))))
    .then(() => {
        console.log('demo completed')
    })
    .catch(console.error)
    .finally(() =>
        mongoose.disconnect()
            .then(() => console.log('disconnected'))
    )