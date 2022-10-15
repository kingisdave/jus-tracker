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

require('./routes')(app)

sequelize.sync()
  .then(() => {
    console.log(`DB started on port ${config.port}`)
  })
// (async () => {
//   await sequelize.sync().then(() => {
//     console.log(`DB started on port ${config.port}`)
//   })
// })()

// app.listen(process.env.PORT || 8090)
app.listen(config.port)
