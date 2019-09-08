const { Surah, Ayah, InfoSurah } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  index: async (req, res) => {
    try {
      const surahs = await Surah.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          { model: InfoSurah, attributes: { exclude: ['createdAt', 'updatedAt', 'text'] } }
        ]
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
  },
  generateSurahs: async (req, res) => {
    try {
      const surahs = (await (await fetch('http://staging.quran.com:3000/api/v3/chapters')).json()).chapters
      surahs.forEach(async surah => {
        try {
          // const { chapter_number, name_arabic, name_complex, name_simple, revelation_order, revelation_place, translated_name, verses_count } = surah
          await Surah.create({
            chapter_number: surah.chapter_number,
            name_arabic: surah.name_arabic,
            name_complex: surah.name_complex,
            name_simple: surah.name_simple,
            revelation_order: surah.revelation_order,
            revelation_place: surah.revelation_place,
            englishNameTranslation: surah.translated_name.name,
            verses_count: surah.verses_count
          })
        } catch (err) {
          console.log(err)
        }
      })
      return res.json({ message: 'Generate all surah success' })
    } catch (err) {
      console.log(err)
      return res.json({
        error: 'Internal server error'
      })
    }
  },
  generateInfoSurah: async (req, res) => {
    try {
      const fromTotal = [1, 114]

      for (fromTotal[0]; fromTotal[0] <= fromTotal[1]; fromTotal[0]++) {
        const Infosurah = (await (await fetch(`http://staging.quran.com:3000/api/v3/chapters/${fromTotal[0]}/info`)).json()).chapter_info
        await InfoSurah.create({
          text: Infosurah.text,
          source: Infosurah.source,
          short_text: Infosurah.short_text,
          language_name: Infosurah.language_name,
          SurahChapterNumber: Infosurah.chapter_id
        })
      }
      return res.json({ message: 'Generate all info surah success' })
    } catch (err) {
      console.log(err)
      return res.json({
        error: 'Internal server error'
      })
    }
  }
}
