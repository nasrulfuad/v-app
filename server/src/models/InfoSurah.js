module.exports = (sequelize, DataTypes) =>
  sequelize.define('InfoSurah', {
    text: DataTypes.TEXT,
    source: DataTypes.STRING,
    short_text: DataTypes.TEXT,
    language_name: DataTypes.STRING
  })
