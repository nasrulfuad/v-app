module.exports = (sequelize, DataTypes) =>
  sequelize.define('Surah', {
    number: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.TEXT,
    englishName: DataTypes.STRING,
    englishNameTranslation: DataTypes.STRING,
    numberOfAyahs: DataTypes.INTEGER,
    revelationType: DataTypes.STRING
  })
