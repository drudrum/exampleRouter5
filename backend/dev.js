import start from './server.js'
import webpackDevMiddleware from 'webpack-dev-middleware'
import middie from 'middie'
import webpack from 'webpack'
import config from '../node_modules/react-scripts/config/webpack.config.js'
import { clientEndpoint } from '../src/constants.js'
import history from 'connect-history-api-fallback'

start(async (fastify) => {
  const cfg = config('development')
  cfg.output.publicPath = `${clientEndpoint}/`
  const compiler = webpack(cfg)
  fastify.get('/', (request, reply) => {
    reply.redirect(`${clientEndpoint}/`)
  })
  await fastify.register(middie)
  fastify.use(history())
  fastify.use(webpackDevMiddleware(compiler, {    
    publicPath: cfg.output.publicPath,
    // historyApiFallback: true
  }))
}).catch((err) => {
  console.log(`Server exit with error: ${err.toString()}`)
  process.exit(1)
})
