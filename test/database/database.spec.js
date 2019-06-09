require('should')

const db = require('../../src/database')

//
//
//

describe('데이터베이스 테스트', () => {
  it('데이터베이스에 연결한다.', async () => await db.sequelize.authenticate())
})
