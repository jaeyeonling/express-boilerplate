require('should')

const db = require('../../../src/database')
const entityLoader = require('../../../src/database/entity.loader')
const AuthProviderType = require('../../../src/type/auth.provider')

//
//
//

describe('인증정보', () => {
  before(async () => await entityLoader.sync({ sequelize: db.sequelize }))

  it('데이터베이스에 저장한다.', () => db.Authentication.create({
    owner: 0,
    authProvider: AuthProviderType.LOCAL,
    userId: 'userId',
    password: 'password'
  }))

  it('데이터베이스에 저장된 인증정보를 조회한다.', async () => {
    const owner = 0
    const authProvider = AuthProviderType.LOCAL
    const userId = 'userId2'
    const password = 'password'

    const authentication = await db.Authentication.create({
      owner,
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
    const owner = 0
    const authProvider = AuthProviderType.LOCAL
    const userId = 'userId3'
    const changePassword = 'asdfghjk'

    const authentication = await db.Authentication.create({
      owner,
      authProvider,
      userId,
      password: 'password'
    })
    authentication.password = 'asdfghjk'

    const updateAuthentication = await authentication.save()

    changePassword.should.equal(updateAuthentication.password)
  })

  it('데이터베이스에 아이디가 겹치면 실패한다.', async () => {
    const owner = 0
    const authProvider = AuthProviderType.LOCAL
    const userId = 'userId4'
    const password = 'password'

    await db.Authentication.create({
      owner,
      authProvider,
      userId,
      password
    })
    try {
      await db.Authentication.create({
        owner,
        authProvider,
        userId,
        password
      })
    } catch (e) {
      e.name.should.equal('SequelizeUniqueConstraintError')
    }
  })
})
