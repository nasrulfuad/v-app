const Joi = require('joi')

const badReq = (res, msg) => {
  return res.status(400).json(msg)
}

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{6,32}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email' :
          badReq(res, {
            error: 'Yout must provide a valid email address'
          })

          break
        case 'password' :
          badReq(res, {
            error: 'Password length minimal 6 and maximal 32'
          })
          break
        default :
          badReq(res, {
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
