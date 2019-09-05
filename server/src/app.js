const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.get('/status', (req, res) => {
  res.json({ message: 'Ahsiyapp' })
})

app.listen(process.env.PORT || 8081)
