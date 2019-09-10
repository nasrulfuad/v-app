const { Surah, Ayah, InfoSurah } = require('../models')
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
  }
}
