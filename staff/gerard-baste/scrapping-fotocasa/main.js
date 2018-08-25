const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const url = 'https://www.fotocasa.es/es/alquiler/casas/barcelona-capital/sant-antoni/l'
const path = '?latitude=41.3794&longitude=2.1597&combinedLocationIds=724,9,8,232,376,8019,0,1151,277'

const results = []

for (let i = 1; i < 6; i++) {
    axios.get(`${url}/${i}${path}`)
        .then(res => {
            const $ = cheerio.load(res.data)
            const items = $('.re-Card-secondary').toArray().map(item => {
                const $item = $(item)
                return {
                    title: $item.find('.re-Card-title').text(),
                    price: $item.find('.re-Card-price').text(),
                    features: $item.find('.re-Card-wrapperFeatures').text(),
                    description: $item.find('.re-Card-description').text()
                }
            })
            return items
        })
        .then(items => results.push(items))
        .then(() => {
            if(i === 5) write(results)
        })
}

function write(results) {
    fs.appendFile(`./items.json`, JSON.stringify(results), err => {
        if (err) console.error(err)
    })
}