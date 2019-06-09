require('should')

const db = require('../../../src/database')
const entityLoader = require('../../../src/database/entity.loader')

//
//
//

describe('유저', () => {
  before(async () => await entityLoader.sync({ sequelize: db.sequelize }))

  it('데이터베이스에 저장한다.', () => db.User.create({ name: '등록' }))

  it('데이터베이스에 저장된 유저 한명을 조회한다.', async () => {
    const name = 'findTest'
    const email = 'email'

    const user = await db.User.create({
      name,
      email
    })
    const findUser = await db.User.findOne({
      where: {
        name
      }
    })

    user.name.should.equal(findUser.name)
    user.email.should.equal(findUser.email)
  })

  it('데이터베이스에 저장된 유저 리스트를 조회한다.', async () => {
    const users = await db.User.findAll()
    users.should.be.instanceOf(Array)
  })

  it('데이터베이스에 유저를 수정한다.', async () => {
    const changeName = 'world'
    const email = 'email'

    const user = await db.User.create({
      name: 'hello',
      email
    })
    user.name = changeName

    const updateUser = await user.save()

    changeName.should.equal(updateUser.name)
  })
})
