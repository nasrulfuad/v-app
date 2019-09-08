const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SurahController = require('./controllers/SurahController')

module.exports = app => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/surah', SurahController.index)
  // Generate all surahs and ayahs
  app.post('/surah', SurahController.generateSurahs)
  app.post('/surah/info', SurahController.generateInfoSurah)
  app.post('/surah/ayah', SurahController.generateSurahsAndAyahs)
  app.get('/surah/:surah', SurahController.show)
  // Generate surah and ayahs by id
  app.post('/surah/:surah', SurahController.generateAyahs)
}
