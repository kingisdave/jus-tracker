module.exports = {
  port: process.env.PORT || 8090,
  db: {
    database: process.env.DB_NAME || 'fdstracker',
    user: process.env.DB_USER || 'fdstracker',
    password: process.env.DB_PASS || 'fdstracker',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './fdstracker.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
