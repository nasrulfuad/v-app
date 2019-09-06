const Joi = require('joi')

const badReq = (res, msg) => res.status(400).json(msg)

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
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
            error: `The password provided failed to match the following rules :
              <br>
              1. It must contain ONLY the following characters : lowercase, uppercase, numerics,
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length
            `
          })
          break
        default :
          badReq(res, {
            error: 'Invalid registration information'
          })
      }
    }
    next()
  }
}
