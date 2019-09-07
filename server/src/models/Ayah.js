module.exports = (sequelize, DataTypes) =>
  sequelize.define('Ayah', {
    text: DataTypes.TEXT,
    numberInSurah: DataTypes.INTEGER,
    juz: DataTypes.INTEGER,
    sajda: DataTypes.BOOLEAN
  })
