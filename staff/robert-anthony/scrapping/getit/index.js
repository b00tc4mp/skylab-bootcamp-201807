'use strict'


const getIt = require('./GetIt')
const processIt = require('./ProcessIt')

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pkg = require('./package.json')
const routes = require('./routes')

const {env: {MONGO_URL}} = process
let connection

const {MongoClient} = require('mongodb')

mongoose.connect('mongodb://localhost/scraping', {useNewUrlParser: true})
  .then(conn => {
    connection = conn
    const db = conn.db() // ??

    const {PORT} = process.env

    const app = express()

    app.use(cors())

    app.use('/api', routes(db))

    app.listen(PORT, () => console.log(`${pkg.name} ${pkg.version} up and running on port ${PORT}`))


    return getIt.fetchSiteData("http://www.sciencemag.org/news/latest-news")
      .then(data => processIt.parseBaseURL("http://www.sciencemag.org", data))
  })
  .catch(console.error)
  .finally(() =>
    connection.disconnect()
      .then(() => console.log('disconnected'))
  )







