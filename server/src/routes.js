const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SurahController = require('./controllers/SurahController')

module.exports = app => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/surahs', SurahController.index)
  app.post('/surahs', SurahController.generateSurahs)
  app.post('/ayahs/:surah', SurahController.generateAyahs)
}
