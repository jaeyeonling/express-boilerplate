const env = require('../env')

//
//
//

module.exports = {
  web: {
    port: env.getInt('WEB_PORT'),
  },
  database: {
    username: env.get('DATABASE_USERNAME'),
    password: env.get('DATABASE_PASSWORD'),
    database: env.get('DATABASE_DATABASE'),
    host: env.get('DATABASE_HOST'),
    port: env.getInt('DATABASE_PORT'),
    dialect: env.get('DATABASE_DIALECT'),
    logging: env.getBoolean('DATABASE_LOGGING')
  },
  passport: {
    google: {
      clientID: env.get('PASSPORT_GOOGLE_CLIENT_ID'),
      clientSecret: env.get('PASSPORT_GOOGLE_CLIENT_SECRET'),
      callbackURL: env.get('PASSPORT_GOOGLE_CALLBACK_URL')
    }
  }
}
