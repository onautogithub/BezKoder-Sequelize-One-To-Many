
console.log('Hello - Starting the backend server')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
  origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Parse requests of content-type -aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

require('./routes/tutorial.routes')(app)

const db = require('./models')

db.sequelize.sync({alter: true}).then(() => {
  console.log('Drop and re-sync Db is false')
})

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})

// Set port, listen for requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
