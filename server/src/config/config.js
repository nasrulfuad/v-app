module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'qodr_quran',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '`',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      define: {
        charset: 'utf8',
        collate: 'utf8_bin'
      }
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || ')**(@&$)%)_!!++#(*Y#B%aj%$ns)('
  }
}
