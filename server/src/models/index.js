const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Ayah.belongsTo(db.Surah)
db.Surah.hasMany(db.Ayah)

db.InfoSurah.belongsTo(db.Surah)
db.Surah.hasOne(db.InfoSurah)

module.exports = db
