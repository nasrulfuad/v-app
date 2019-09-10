module.exports = (sequelize, DataTypes) =>
  sequelize.define('Surah', {
    chapter_number: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name_arabic: DataTypes.STRING,
    name_complex: DataTypes.STRING,
    name_simple: DataTypes.STRING,
    revelation_order: DataTypes.INTEGER,
    revelation_place: DataTypes.STRING,
    englishNameTranslation: DataTypes.STRING,
    verses_count: DataTypes.INTEGER
  })
