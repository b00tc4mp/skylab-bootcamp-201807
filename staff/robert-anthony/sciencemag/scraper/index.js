'use strict'


const getIt = require('./getIt')
const processIt = require('./processIt')
const saveIt = require('./saveIt')

require('dotenv').config()

const mongoose = require('mongoose')
//const routes = require('./routes')

const {env: {MONGO_URL}} = process
let connection


mongoose.connect('mongodb://localhost/scraping', {useNewUrlParser: true})
  .then(conn => {
    connection = conn

    const {PORT} = process.env

   // const app = express()

   // app.use(cors())

   // app.use('/api', routes(db))

   // app.listen(PORT, () => console.log(`${pkg.name} ${pkg.version} up and running on port ${PORT}`))


    return getIt.fetchSiteData("http://www.sciencemag.org/news/latest-news")
      .then(data => processIt.parseBaseURL("http://www.sciencemag.org", data))
  })
  .then(results => saveIt.save(results))
  .then(() =>
    connection.disconnect()
      .then(() => console.log('disconnected'))
  )
  .catch(console.error)








