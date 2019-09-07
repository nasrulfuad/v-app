module.exports = (sequelize, DataTypes) =>
  sequelize.define('Ayah', {
    number: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    text: DataTypes.TEXT,
    numberInSurah: DataTypes.INTEGER,
    juz: DataTypes.INTEGER,
    sajda: DataTypes.BOOLEAN
  })
