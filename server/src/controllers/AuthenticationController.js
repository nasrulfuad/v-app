const { User } = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: 'This email account is already in use'
      })
    }
  }
}
