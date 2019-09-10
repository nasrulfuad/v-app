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
