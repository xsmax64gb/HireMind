import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'
import { testConnection } from './config/db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.use('/api', routes)

app.get('/', (req, res) => {
    res.send("Hello World! this is backend server");
})

testConnection().then(() => {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
}).catch(err => {
    console.error('Failed to connect to database:', err.message)
    process.exit(1)
})