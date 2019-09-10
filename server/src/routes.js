const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StaticController = require('./controllers/StaticController')

module.exports = app => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/surah', StaticController.index)
  // Generate all surahs
  app.get('/surah/read/:id', StaticController.showAyah)
  app.get('/surah/:id', StaticController.show)
}
