const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { authentication } = require('../config/config')

function jwtSigner (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body
      const emailExist = await User.findOne({ where: { email } })
      if (emailExist) return res.status(403).json({ error: 'Email is already registered' })
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({ email, password: hashedPassword })
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: 'This email account is already in use'
      })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) return res.status(403).json({ error: 'Email is not registered' })
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!user || !isPasswordValid) return res.status(403).json({ error: 'The login information was incorrect' })
      return res.json({ user, token: jwtSigner(user.toJSON()) })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'An error has occured trying to login' })
    }
  }
}
