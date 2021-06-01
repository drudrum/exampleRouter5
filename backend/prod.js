import start from './server.js'
start().catch((err) => {
  console.log(`Server exit with error: ${err.toString()}`)
  process.exit(1)
})
