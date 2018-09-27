const mongoose = require('mongoose')
const fetch = require('node-fetch');
const Champion = require('../models/champion')
const fs = require('fs')

const allChamps = []
let file

mongoose.connect('mongodb://localhost/gg-wp', { useNewUrlParser: true })
    .then(() => {
        console.log('connected')
        mongoose.connection.db.dropDatabase()

    })
    .then(async () => {

        const result = await fetch('http://ddragon.leagueoflegends.com/cdn/8.15.1/data/en_US/championFull.json')
        const resJson = await result.json()
        const keys = resJson.keys

        for (var name in keys) {
            var value = keys[name];
            allChamps.push({ "key": name, "name": value })
        }

        fs.writeFileSync('./champions-full-data.json', JSON.stringify(allChamps), 'utf8', (err) => {
            if (err) throw err;
        });

        file = JSON.parse(fs.readFileSync('./champions-full-data.json', 'utf-8'))

        return Promise.all(file.map(elem => Champion.create(elem)))
    })
    .then(() => {
        console.log('demo completed')
    })
    .catch(console.error)
    .finally(() =>
        mongoose.disconnect()
            .then(() => console.log('disconnected'))
    )