const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SurahController = require('./controllers/SurahController')

module.exports = app => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/surah', SurahController.index)
  app.post('/surah/:surah', SurahController.generateAyahs)
  app.get('/surah/:surah', SurahController.index)
}
