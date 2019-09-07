module.exports = (sequelize, DataTypes) =>
  sequelize.define('Surah', {
    name: DataTypes.TEXT,
    englishName: DataTypes.STRING,
    englishNameTranslation: DataTypes.STRING,
    numberOfAyahs: DataTypes.INTEGER,
    revelationType: DataTypes.STRING
  })
