const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
  res.json({
    message: `Hello ${req.body.email}! Your user was registered! Have fun!`
  })
})

app.listen(process.env.PORT || 8081)
