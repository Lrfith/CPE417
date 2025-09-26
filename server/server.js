const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

app.use(morgan('dev'))
app.use(express.json({limit: '20mb'}))
app.use(cors())

readdirSync('./routes').map((r)=> app.use('/api', require(`./routes/${r}`)))


app.listen(5000, () => console.log("Server is running on port 5000"))