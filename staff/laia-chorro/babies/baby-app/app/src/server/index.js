import path from 'path'
import express from 'express'
import cors from 'cors'
import router from './router'

const port = process.env.PORT || 3000

const app = express()

const assets = express.static(path.join(__dirname, '../'))

app.use(cors())
app.use(assets)

app.get('*', router)

app.listen(port, () => {console.log(`Listening at port: ${port}`)})

export default app
