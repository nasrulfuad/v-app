const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SurahController = require('./controllers/SurahController')
const StaticController = require('./controllers/StaticController')

module.exports = app => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/surah', StaticController.index)
  // Generate all surahs
  app.post('/surah', SurahController.generateSurahs)
  app.post('/surah/info', SurahController.generateInfoSurah)
  app.get('/surah/:id', StaticController.show)
}
