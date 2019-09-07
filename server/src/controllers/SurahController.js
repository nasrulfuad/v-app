const { Surah, Ayah } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  index: async (req, res) => {
    try {
      const surah = await Surah.findByPk(req.params.surah, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Ayah,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })
      return res.json(surah)
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'An error has occured trying to fetch the surahs'
      })
    }
  },
  generateSurahs: async (req, res) => {
    try {
      const { data } = await (await fetch('http://api.alquran.cloud/v1/surah')).json()
      data.forEach(async surah => {
        const { number, name, englishName, englishNameTranslation, numberOfAyahs, revelationType } = surah
        try {
          await Surah.create({ number, name, englishName, englishNameTranslation, numberOfAyahs, revelationType })
        } catch (err) {
          console.log(err)
          return true
        }
      })
      return res.json({
        message: 'Success generate surahs'
      })
    } catch (err) {
      console.log(err)
      return res.json({
        error: 'Internal server error'
      })
    }
  },
  generateAyahs: async (req, res) => {
    try {
      const { data } = await (await fetch(`http://api.alquran.cloud/v1/surah/${req.params.surah}`)).json()
      const { name, englishName, englishNameTranslation, numberOfAyahs, revelationType, ayahs } = data

      const surah = await Surah.create({ name, englishName, englishNameTranslation, numberOfAyahs, revelationType })

      ayahs.forEach(async ayah => {
        const { text, numberInSurah, juz, sajda } = ayah
        try {
          await Ayah.create({ text, numberInSurah, juz, sajda, SurahId: surah.id })
        } catch (err) {
          console.log(err)
          return true
        }
      })
      return res.json({
        message: 'Success generate surahs'
      })
    } catch (err) {
      console.log(err)
      return res.json({
        error: 'Internal server error'
      })
    }
  }
}
