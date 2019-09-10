module.exports = (sequelize, DataTypes) =>
  sequelize.define('Ayah', {
    verse_number: DataTypes.INTEGER,
    text_madani: DataTypes.TEXT,
    text_indopak: DataTypes.TEXT,
    text_simple: DataTypes.TEXT,
    juz_number: DataTypes.INTEGER,
    sajdah: DataTypes.BOOLEAN,
    page_number: DataTypes.INTEGER,
    english_translation: DataTypes.TEXT,
    indonesia_translation: DataTypes.TEXT
  })
