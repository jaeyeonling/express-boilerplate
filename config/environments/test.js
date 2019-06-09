const env = require('../env')

//
//
//

module.exports = {
  application: {
    name: env.get('APPLICATION_NAME'),
    version: env.get('APPLICATION_VERSION'),
  },
  web: {
    host: env.get('WEB_HOST'),
    port: env.getInt('WEB_PORT'),
  },
  database: {
    storage: ':memory:',
    dialect: 'sqlite',
    logging: false
  },
  redis: {
    host: env.get('REDIS_HOST'),
    port: env.getInt('REDIS_PORT')
  },
  security: {
    jwt: {
      algorithm: env.get('SECURITY_JWT_ALGORITHM'),
      headerName: env.get('SECURITY_JWT_HEADER_NAME'),
      secret: env.get('SECURITY_JWT_SECRET'),
      expiresIn: env.getInt('SECURITY_JWT_EXPIRES_IN'),
      refreshIn: env.getInt('SECURITY_JWT_REFRESH_IN')
    }
  },
  passport: {
    google: {
      clientID: env.get('PASSPORT_GOOGLE_CLIENT_ID'),
      clientSecret: env.get('PASSPORT_GOOGLE_CLIENT_SECRET'),
      callbackURL: env.get('PASSPORT_GOOGLE_CALLBACK_URL'),
      scope: env.getArray('PASSPORT_GOOGLE_SCOPE')
    },
    kakao: {
      clientID: env.get('PASSPORT_KAKAO_CLIENT_ID'),
      clientSecret: env.get('PASSPORT_KAKAO_CLIENT_SECRET'),
      callbackURL: env.get('PASSPORT_KAKAO_CALLBACK_URL')
    }
  },
  smtp: {
    transport: {
      host: env.get('SMTP_TRANSPORT_HOST'),
      port: env.getInt('SMTP_TRANSPORT_PORT'),
      secure: env.getBoolean('SMTP_TRANSPORT_SECURE'),
      auth: {
        user: env.get('SMTP_TRANSPORT_AUTH_USER'),
        pass: env.get('SMTP_TRANSPORT_AUTH_PASS')
      }
    }
  },

  hello: 'world'
}
