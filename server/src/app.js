const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const { sequelize } = require('./models')
const config = require('./config/config')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

sequelize.sync().then(() => {
  console.log(`DB started on port ${config.port}`)
})

require('./routes')(app)

// app.listen(process.env.PORT || 8090)
app.listen(config.port)
