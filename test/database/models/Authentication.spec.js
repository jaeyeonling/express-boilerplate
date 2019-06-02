require('should')

const db = require('../../../database')
const modelLoader = require('../../../database/model.loader')

//
//
//

describe('인증정보', () => {
  before(async () => await modelLoader.sync({ sequelize: db.sequelize }))

  it('데이터베이스에 저장한다.', () => db.Authentication.create({
    authProvider: 'SERVER',
    userId: 'userId',
    password: 'password'
  }))

  it('데이터베이스에 저장된 인증정보를 조회한다.', async () => {
    const authProvider = 'SERVER'
    const userId = 'userId2'
    const password = 'password'

    const authentication = await db.Authentication.create({
      authProvider,
      userId,
      password
    })
    const findAuthentication = await db.Authentication.findOne({
      where: {
        authProvider,
        userId
      }
    })

    authentication.authProvider.should.equal(findAuthentication.authProvider)
    authentication.userId.should.equal(findAuthentication.userId)
    authentication.password.should.equal(findAuthentication.password)
  })

  it('데이터베이스에 저장된 인증정보 리스트를 조회한다.', async () => {
    const authentications = await db.Authentication.findAll()
    authentications.should.be.instanceOf(Array)
  })

  it('데이터베이스에 인증정보를 수정한다.', async () => {
    const authProvider = 'SERVER'
    const userId = 'userId3'
    const changePassword = 'asdfghjk'

    const authentication = await db.Authentication.create({
      authProvider,
      userId,
      password: 'password'
    })
    authentication.password = 'asdfghjk'

    const updateAuthentication = await authentication.save()

    changePassword.should.equal(updateAuthentication.password)
  })

  it('데이터베이스에 아이디가 곂치면 실패한다.', async () => {
    const authProvider = 'SERVER'
    const userId = 'userId4'
    const password = 'password'

    await db.Authentication.create({
      authProvider,
      userId,
      password
    })
    try {
      await db.Authentication.create({
        authProvider,
        userId,
        password
      })
    } catch (e) {
      e.name.should.equal('SequelizeUniqueConstraintError')
    }
  })
})
