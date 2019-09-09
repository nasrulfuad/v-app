const fs = require('fs')
module.exports = {
  index: async (req, res) => {
    try {
      const data = await JSON.parse(fs.readFileSync(`${__dirname}/../data/surah-info.json`, 'utf8')).surah_info
      return res.json({
        data
      })
    } catch (err) {
      return res.status(500).json({
        error: 'An error has occured trying to fetch data'
      })
    }
  },
  show: async (req, res) => {
    try {
      const results = await JSON.parse(fs.readFileSync(`${__dirname}/../data/surah-info.json`, 'utf8')).surah_info
      const data = await results.filter(result => result.index === +req.params.id)
      return res.json({
        data
      })
    } catch (err) {
      return res.status(500).json({
        error: 'An error has occured trying to fetch data'
      })
    }
  }
}
