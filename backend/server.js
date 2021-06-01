import fastify from 'fastify'
import http from 'http'
// import { backendEndpoint } from '../src/constants.js'

async function start(asyncFastifyExtend) {
  let httpServer = null
  // let socketsMain = null
  const serverFactory = (fastifyReqHandler) => {
    httpServer = http.createServer((req, res) => {
      fastifyReqHandler(req, res)
    })

  // socketsMain = new SocketsMain(httpServer, mdb)
    return httpServer
  }

  const app = fastify({ serverFactory })
  // await app.register(fastifyCookie)
  // await app.register(statisticShowRoutes(mdb), { prefix: backendEndpoint })

  if (asyncFastifyExtend) {
    // Если стартуем в режиме отладки, то подключаем клиентскую часть(WebPack)
    await asyncFastifyExtend(app)
  }

  const PORT = process.env.PORT || process.env.STATISTIC_PORT || 3010
  const HOST = process.env.HOST || '127.0.0.1'
  app.listen(PORT, HOST, async (err, address) => {
    if (err) {
    //  await dbClient.close()
      console.error(err.toString())
      process.exit(2)
    }
    console.log(`server listening on ${address}`)
  })
}

export default start
