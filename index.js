const server = require('./src/http/server')
const config = require('./config')

//
//
//

const {
  web: {
    host,
    port
  },
  application: {
    name,
    version
  }
} = config

server.listen(
  port,
  host,
  () => console.info(`
      ${name} (v${version})

      server started on port ${port} at ${host}
  `)
)
