const fs = require('fs')
module.exports = {
  index: async (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(`${__dirname}/../data/surah-info.json`, 'utf8')).surah_info
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
      const results = JSON.parse(fs.readFileSync(`${__dirname}/../data/surah-info.json`, 'utf8')).surah_info
      const data = await results.filter(result => result.index === +req.params.id)
      return res.json({
        data
      })
    } catch (err) {
      return res.status(500).json({ error: 'An error has occured trying to fetch data' })
    }
  },
  showAyah: async (req, res) => {
    try {
      const results = JSON.parse(fs.readFileSync(`${__dirname}/../data/surah/${req.params.id}.json`, 'utf8'))
      return res.json({ results })
    } catch (err) {
      return res.status(500).json({ error: 'An error has occured trying to fetch data' })
    }
  }
}
