'use strict'



require('dotenv').config()
const {logic} = require('./logic')
const mongoose = require('mongoose')
const express = require('express')
//const routes = require('./routes')
const cors = require('cors')
const pkg = require('../package.json')
const {env: {MONGO_URL}} = process
let connection


mongoose.connect('mongodb://localhost/scraping', {useNewUrlParser: true})
  .then(conn => {
    connection = conn

    const {PORT} = process.env

    const app = express()

    app.use(cors())

    app.get('/search', (req, res) => {

      const orTerm = "-or-"
      let {query: {q,field}} = req
      if (q.includes(orTerm)) {
        q = q.split(orTerm)
      }
      logic.search(field,q)
        .then(result => res.json(result))
        .catch(err => {
          const {message} = err
          res.json({message})
        })
    })

    app.listen(PORT, () => console.log(`${pkg.name} ${pkg.version} up and running on port ${PORT}`))



  })








