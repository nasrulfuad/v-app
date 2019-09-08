const { Surah, Ayah } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  index: async (req, res) => {
    try {
      const surahs = await Surah.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      return res.json({
        status: 'Success',
        data: surahs
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'An error has occured trying to fetch the surahs'
      })
    }
  },
  show: async (req, res) => {
    try {
      const surahs = await Surah.findByPk(req.params.surah, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          { model: Ayah, attributes: { exclude: ['createdAt', 'updatedAt'] } }
        ]
      })
      return res.json({
        status: 'Success',
        data: surahs
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'An error has occured trying to fetch the single surah'
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
        const sujud = (typeof sajda === 'object') ? !false : false
        try {
          await Ayah.create({ text, numberInSurah, juz, sajda: sujud, SurahId: surah.id })
        } catch (err) {
          console.log(err)
          return false
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
  generateSurahsAndAyahs: async (req, res) => {
    try {
      const fromTotal = [51, 80]
      let die = false

      for (fromTotal[0]; fromTotal[0] <= fromTotal[1]; fromTotal[0]++) {
        const { data } = await (await fetch(`http://api.alquran.cloud/v1/surah/${fromTotal[0]}`)).json()
        const { name, englishName, englishNameTranslation, numberOfAyahs, revelationType, ayahs } = data

        const surah = await Surah.create({ name, englishName, englishNameTranslation, numberOfAyahs, revelationType })
        ayahs.every(async ayah => {
          const { text, numberInSurah, juz, sajda } = ayah
          const sujud = (typeof sajda === 'object') ? !false : false
          try {
            await Ayah.create({ text, numberInSurah, juz, sajda: sujud, SurahId: surah.id })
          } catch (err) {
            console.log(err)
            die = true
            return false
          }
        })
        if (die) break
      }
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
