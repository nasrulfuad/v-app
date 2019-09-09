const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { sequelize } = require('./models')

const app = express()

const { port } = require('./config/config')

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

require('./routes.js')(app)
sequelize.sync({ force: false })
  .then(() => {
    app.listen(port)
    console.log(`Server running on : http://localhost:${port}`)
  })
